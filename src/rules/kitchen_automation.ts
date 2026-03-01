// src/rules/kitchen_automation.ts

import { rule, ruleActions } from "@uhn/blueprint";
import { kitchenLightCeiling, kitchenPanelButtonWallEdgeTopLeft, kitchenPanelButtonWallEdgeTopRight, kitchenSocketForToaster } from "../resources/kitchen";


const kitchenMainLight = rule({ description: "Toggle kitchen main light on tap of either top button on wall edge panel" })
    .onTap(kitchenPanelButtonWallEdgeTopRight)
    .onTap(kitchenPanelButtonWallEdgeTopLeft)
    .run((ctx) => {
        return ruleActions([
            { type: "setDigitalOutput", resource: kitchenLightCeiling, value: !ctx.runtime.getState(kitchenLightCeiling) },
        ]);
    });

const kitchenToasterSocket = rule({ description: "Toggle kitchen toaster socket on long press of top left button on wall edge panel" })
    .onLongPress(kitchenPanelButtonWallEdgeTopLeft, 2000)
    .executionTarget("master")
    .run((ctx) => {
        ctx.logger.info("Long press detected on kitchen panel top left button");
        return ruleActions([
            { type: "setDigitalOutput", resource: kitchenSocketForToaster, value: !ctx.runtime.getState(kitchenSocketForToaster) }
        ]);
    });




