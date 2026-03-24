// src/rules/kitchen_automation.ts

import { rule, ruleAction, seconds } from "@uhn/blueprint";
import { kitchenPanelButtonWallEdgeTopLeft, kitchenSocketForToaster } from "../resources/kitchen";

const kitchenToasterSocket = rule({ description: "Toggle kitchen toaster socket on long press of top left button on wall edge panel" })
    .onLongPress(kitchenPanelButtonWallEdgeTopLeft, seconds(2))
    .actionHints(kitchenSocketForToaster)
    .executionTarget("master")
    .run((ctx) => {
        ctx.logger.info("Long press detected on kitchen panel top left button");
        return [
            ruleAction({ type: "setDigitalOutput", resource: kitchenSocketForToaster, value: !ctx.runtime.getState(kitchenSocketForToaster) }),
        ];
    });




