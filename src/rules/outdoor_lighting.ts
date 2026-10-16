// src/rules/outdoor_lighting.ts
// Outdoor front light with dusk windows, a PIR that takes over at night, and manual toggle.
//
// - 16:00–21:00 and 06:30–09:00 ("dusk windows"): the light follows the twilight sensor (on when dark).
// - Whenever it is dark, the driveway PIR switches the light on and starts a 5 minute timer that switches it off again.
//   While that timer runs the PIR "has control" of the light.
// - A window that opens while the PIR has control takes over: the light stays on and the PIR timer is cancelled.
//   A window that closes (or a twilight change) while the PIR has control is ignored, the timer finishes first.
// - The buttons toggle the light. Switching it off by hand hands the light to the PIR again if it is dark.
//
// The only state kept is the PIR timer. Window start/end come from the schedule phases, otherwise from the clock.

import { isCausedBySchedulePhase, minutes, rule, ruleAction } from "@uhn/blueprint";
import {
    outdoorIndicatorLightFront,
    outdoorLightFront,
    outdoorLightPirTimer,
    outdoorPirDriveway,
    outdoorRemoteButton,
    outdoorTwilightSensor,
    outdoorWallButton,
} from "../resources/outdoor";
import { scheduleOutdoorLighting } from "../schedules/outdoor";

const PIR_ON_TIME = minutes(5);

const EVENING_START = 16 * 60;
const EVENING_END = 21 * 60;
const MORNING_START = 6 * 60 + 30;
const MORNING_END = 9 * 60;

// Minutes since midnight in Helsinki time
const minutesOfDay = (timestamp: number): number => {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Helsinki", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date(timestamp));
    const hour = Number(parts.find((p) => p.type === "hour")?.value);
    const minute = Number(parts.find((p) => p.type === "minute")?.value);
    return hour * 60 + minute;
};

// Windows where the light follows the twilight sensor
const isInDuskWindow = (timestamp: number): boolean => {
    const m = minutesOfDay(timestamp);
    return (m >= EVENING_START && m < EVENING_END) || (m >= MORNING_START && m < MORNING_END);
};

// Mirror the light state on the wall button indicator
const outdoorMirrorIndicator = rule({ description: "Wall button indicator mirrors the front outdoor light" })
    .onChanged(outdoorLightFront)
    .actionHints(outdoorIndicatorLightFront)
    .run((ctx) => [
        ruleAction({ type: "setDigitalOutput", resource: outdoorIndicatorLightFront, value: !!ctx.runtime.getState(outdoorLightFront) }),
    ]);

// Window start/end or twilight change: light is on when it is dark inside a window, otherwise off
const outdoorDuskWindows = rule({ description: "Outdoor light follows the twilight sensor inside the evening and morning windows" })
    .onSchedulePhase(scheduleOutdoorLighting.phases.eveningStart)
    .onSchedulePhase(scheduleOutdoorLighting.phases.eveningEnd)
    .onSchedulePhase(scheduleOutdoorLighting.phases.morningStart)
    .onSchedulePhase(scheduleOutdoorLighting.phases.morningEnd)
    .onChanged(outdoorTwilightSensor)
    .actionHints(outdoorLightFront, outdoorLightPirTimer)
    .run((ctx) => {
        let inWindow: boolean;
        // Use the phase itself rather than the clock so a phase firing a moment early or late can't flip the result
        if (isCausedBySchedulePhase(ctx, scheduleOutdoorLighting.phases.eveningStart)
            || isCausedBySchedulePhase(ctx, scheduleOutdoorLighting.phases.morningStart)) {
            inWindow = true;
        } else if (isCausedBySchedulePhase(ctx, scheduleOutdoorLighting.phases.eveningEnd)
            || isCausedBySchedulePhase(ctx, scheduleOutdoorLighting.phases.morningEnd)) {
            inWindow = false;
        } else {
            inWindow = isInDuskWindow(ctx.cause.timestamp);
        }
        const isDark = !!ctx.runtime.getState(outdoorTwilightSensor);
        const turnOn = inWindow && isDark;
        ctx.logger.info("Dusk windows", { inWindow, isDark });

        if (ctx.timers.isRunning(outdoorLightPirTimer)) {
            // The PIR has control: a window taking over cancels the PIR timer, otherwise let the PIR finish
            if (!turnOn) return [];
            ctx.timers.clear(outdoorLightPirTimer);
        }
        return [ruleAction({ type: "setDigitalOutput", resource: outdoorLightFront, value: turnOn })];
    });

// Driveway PIR: when dark, take control of the light for a few minutes. Does nothing if the light is already on
// without the PIR timer (window or manual), but extends the time if the PIR itself switched it on.
const outdoorPirTakesControl = rule({ description: "Driveway PIR switches on the outdoor light when it is dark" })
    .onActivated(outdoorPirDriveway)
    .actionHints(outdoorLightFront, outdoorLightPirTimer)
    .run((ctx) => {
        const isDark = !!ctx.runtime.getState(outdoorTwilightSensor);
        const isOn = !!ctx.runtime.getState(outdoorLightFront);
        if (!isDark) return [];
        if (isOn && !ctx.timers.isRunning(outdoorLightPirTimer)) return [];
        ctx.timers.start(outdoorLightPirTimer, PIR_ON_TIME, "restart");
        return [ruleAction({ type: "setDigitalOutput", resource: outdoorLightFront, value: true })];
    });

// The PIR timer ran out: switch off
const outdoorPirTimerExpired = rule({ description: "Outdoor light off when the PIR timer expires" })
    .onTimerExpired(outdoorLightPirTimer)
    .actionHints(outdoorLightFront)
    .run(() => [
        ruleAction({ type: "setDigitalOutput", resource: outdoorLightFront, value: false }),
    ]);

// Manual buttons toggle the light. Clearing the timer is silent, so it does not trigger the expiry rule.
const outdoorManualToggle = rule({ description: "Buttons toggle the front outdoor light" })
    .onTap(outdoorWallButton)
    .onTap(outdoorRemoteButton)
    .actionHints(outdoorLightFront, outdoorLightPirTimer)
    .run((ctx) => {
        const turnOn = !ctx.runtime.getState(outdoorLightFront);
        ctx.timers.clear(outdoorLightPirTimer);
        return [ruleAction({ type: "setDigitalOutput", resource: outdoorLightFront, value: turnOn })];
    });
