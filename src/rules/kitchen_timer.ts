// src/rules/kitchen_timer.ts
// Sample rules demonstrating master-targeted timer usage.
// These rules run on master to show the cross-edge timer flow:
// master dispatches timerStart → edge runs timer → edge publishes state via MQTT → master receives state

import { rule, ruleActions } from "@uhn/blueprint";
import {
    kitchenLightCountertops,
    kitchenPanelButtonCountertopTopRow,
    kitchenTimer,
} from "../resources/kitchen";

const kitchenCountertopLightTimer = rule({ description: "Start kitchen timer on countertop button tap (master-targeted)" })
    .onTap(kitchenPanelButtonCountertopTopRow)
    .executionTarget("master")
    .run((ctx) => {
        const isOn = ctx.runtime.getState(kitchenLightCountertops);
        if (isOn) {
            ctx.timers.clear(kitchenTimer);
            return ruleActions([
                { type: "setOutput", resource: kitchenLightCountertops, value: false },
            ]);
        }
        ctx.logger.info("Starting kitchen countertop timer for 1 minutes");
        ctx.timers.start(kitchenTimer,  60 * 1000, "restart");
        return ruleActions([
            { type: "setOutput", resource: kitchenLightCountertops, value: true },
        ]);
    });

const kitchenTimerExpired = rule({ description: "Turn off countertop lights when kitchen timer expires" })
    .onTimerDeactivated(kitchenTimer)
    .executionTarget("master")
    .run((ctx) => {
        ctx.logger.info("Kitchen timer expired — turning off countertop lights");
        return ruleActions([
            { type: "setOutput", resource: kitchenLightCountertops, value: false },
        ]);
    });
