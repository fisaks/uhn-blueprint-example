// src/rules/emit_test.ts
import { rule, ruleAction } from "@uhn/blueprint";
import { kitchenPanelButtonWallEdgeBottomLeft } from "../resources/kitchen";
import { toiletButtonToggle } from "../resources/toilet";

const emitSignalTest = rule({ description: "Emit signal test on bottom left button tap" })
    .onTap(kitchenPanelButtonWallEdgeBottomLeft)
    .actionHints(toiletButtonToggle)
    .run((ctx) => {
        return [
            ruleAction({ type: "emitSignal", resource: toiletButtonToggle, value: !ctx.runtime.getState(toiletButtonToggle) }),
        ];
    });

