// src/rules/emit_test.ts
import { rule, ruleActions } from "@uhn/blueprint";
import { kitchenPanelButtonWallEdgeBottomLeft } from "../resources/kitchen";
import { toiletButtonToggle } from "../resources/toilet";

const emitSignalTest = rule({ description: "Emit signal test on bottom left button tap" })
    .onTap(kitchenPanelButtonWallEdgeBottomLeft)
    .run((ctx) => {
        return ruleActions([
            {
                type: "emitSignal", resource: toiletButtonToggle,
                value: !ctx.runtime.getState(toiletButtonToggle)
            }
        ]);
    });

