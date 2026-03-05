// src/rules/bathroom_ventilation.ts
// Demonstrates master-hosted timer usage.
// All rules auto-resolve to executionTarget: "master" because they reference
// bathroomVentTimer (host: "master") alongside edge-hosted resources.
// The timer runs locally in the master runtime (Node.js setTimeout) — no MQTT round-trip.

import { minutes, rule, ruleActions } from "@uhn/blueprint";
import {
    bathroomButtonVent,
    bathroomFanSpeed,
    bathroomHumidity,
    bathroomVentIndicator,
    bathroomVentTimer,
} from "../resources/bathroom";

// --- Automatic trigger: humidity threshold ---
// When humidity rises above 70%, start the vent timer for 5 minutes.
// Uses "startOnce" so repeated threshold crossings don't restart the timer.
const bathroomHumidityStartsVent = rule({ description: "Start ventilation when humidity exceeds 70%" })
    .onAbove(bathroomHumidity, 70, { hysteresis: 5 })
    .run((ctx) => {
        const result = ctx.timers.start(bathroomVentTimer, minutes(5), "startOnce");
        if (result === "alreadyRunning") {
            ctx.logger.debug("Ventilation timer already running, skipping");
            return [];
        }
        ctx.logger.info("Humidity high — starting ventilation for 5 minutes");
        return ruleActions([
            { type: "setAnalogOutput", resource: bathroomFanSpeed, value: 80 },
        ]);
    });

// --- Timer activation: turn on indicator ---
const bathroomVentTimerActivated = rule({ description: "Show indicator when ventilation timer starts" })
    .onTimerActivated(bathroomVentTimer)
    .run((ctx) => {
        ctx.logger.info("Ventilation timer activated — indicator on");
        return ruleActions([
            { type: "setDigitalOutput", resource: bathroomVentIndicator, value: true },
        ]);
    });

// --- Timer expiry: turn off fan and indicator ---
const bathroomVentTimerExpired = rule({ description: "Stop ventilation when timer expires" })
    .onTimerDeactivated(bathroomVentTimer)
    .run((ctx) => {
        ctx.logger.info("Ventilation timer expired — fan and indicator off");
        return ruleActions([
            { type: "setAnalogOutput", resource: bathroomFanSpeed, value: 0 },
            { type: "setDigitalOutput", resource: bathroomVentIndicator, value: false },
        ]);
    });

// --- Manual toggle: button starts or clears the timer ---
// Uses timers.isRunning() to check current state and toggle accordingly.
const bathroomManualVentToggle = rule({ description: "Toggle ventilation with button tap" })
    .onTap(bathroomButtonVent)
    .run((ctx) => {
        if (ctx.timers.isRunning(bathroomVentTimer)) {
            ctx.logger.info("Manual stop — clearing ventilation timer");
            ctx.timers.clear(bathroomVentTimer);
            return ruleActions([
                { type: "setAnalogOutput", resource: bathroomFanSpeed, value: 0 },
            ]);
        }
        ctx.logger.info("Manual start — ventilation for 10 minutes");
        ctx.timers.start(bathroomVentTimer, minutes(10), "restart");
        return ruleActions([
            { type: "setAnalogOutput", resource: bathroomFanSpeed, value: 100 },
        ]);
    });
