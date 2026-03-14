// src/rules/kitchen_timer.ts
// Timer rules for kitchen lights.
// Both run on master (cross-edge timer flow: master dispatches timerStart → edge runs timer
// → edge publishes state via MQTT → master receives state).

import { minutes, rule, ruleActions } from "@uhn/blueprint";
import {
    kitchenCeilingTimer,
    kitchenCountertopTimer,
    kitchenLightCeiling,
    kitchenLightCountertops,
    kitchenPanelButtonCountertopTopRow,
    kitchenPanelButtonWallEdgeTopLeft,
    kitchenPanelButtonWallEdgeTopRight,
    kitchenPir,
} from "../resources/kitchen";

// --- Countertop light timer ---

const kitchenCountertopLightToggle = rule({ description: "Toggle countertop lights with timer on button tap" })
    .onTap(kitchenPanelButtonCountertopTopRow)
    .actionHints(kitchenLightCountertops, kitchenCountertopTimer)
    .executionTarget("master")
    .run((ctx) => {
        const isOn = ctx.runtime.getState(kitchenLightCountertops);
        if (isOn) {
            ctx.timers.clear(kitchenCountertopTimer);
            return ruleActions([
                { type: "setDigitalOutput", resource: kitchenLightCountertops, value: false },
            ]);
        }
        ctx.logger.info("Starting kitchen countertop timer for 1 minute");
        ctx.timers.start(kitchenCountertopTimer, minutes(1), "restart");
        return ruleActions([
            { type: "setDigitalOutput", resource: kitchenLightCountertops, value: true },
        ]);
    });

const kitchenCountertopTimerExpired = rule({ description: "Turn off countertop lights when timer expires" })
    .onTimerDeactivated(kitchenCountertopTimer)
    .actionHints(kitchenLightCountertops)
    .executionTarget("master")
    .run((ctx) => {
        ctx.logger.info("Kitchen countertop timer expired — turning off lights");
        return ruleActions([
            { type: "setDigitalOutput", resource: kitchenLightCountertops, value: false },
        ]);
    });

// --- Ceiling light timer ---

const kitchenCeilingLightToggle = rule({ description: "Toggle ceiling light with timer on wall button tap" })
    .onTap(kitchenPanelButtonWallEdgeTopLeft)
    .onTap(kitchenPanelButtonWallEdgeTopRight)
    .actionHints(kitchenLightCeiling, kitchenCeilingTimer)
    .executionTarget("master")
    .run((ctx) => {
        const isOn = ctx.runtime.getState(kitchenLightCeiling);
        if (isOn) {
            ctx.timers.clear(kitchenCeilingTimer);
            return ruleActions([
                { type: "setDigitalOutput", resource: kitchenLightCeiling, value: false },
            ]);
        }
        ctx.logger.info("Starting kitchen ceiling timer for 5 minutes");
        ctx.timers.start(kitchenCeilingTimer, minutes(5), "restart");
        return ruleActions([
            { type: "setDigitalOutput", resource: kitchenLightCeiling, value: true },
        ]);
    });

const kitchenCeilingPirRestart = rule({ description: "PIR activity restarts ceiling light timer if light is on" })
    .onActivated(kitchenPir)
    .actionHints(kitchenCeilingTimer)
    .executionTarget("master")
    .run((ctx) => {
        if (!ctx.runtime.getState(kitchenLightCeiling)) return [];
        ctx.logger.info("PIR activity — restarting ceiling timer");
        ctx.timers.start(kitchenCeilingTimer, minutes(5), "restart");
        return [];
    });

const kitchenCeilingTimerExpired = rule({ description: "Turn off ceiling light when timer expires" })
    .onTimerDeactivated(kitchenCeilingTimer)
    .actionHints(kitchenLightCeiling)
    .executionTarget("master")
    .run((ctx) => {
        ctx.logger.info("Kitchen ceiling timer expired — turning off light");
        return ruleActions([
            { type: "setDigitalOutput", resource: kitchenLightCeiling, value: false },
        ]);
    });
