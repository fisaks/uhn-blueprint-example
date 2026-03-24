// src/rules/emit_action_test.ts
// Demonstrates emitAction for rule chaining.
//
// Scenario: PIR motion → emitAction simulates "toggle" on the portable button panel
// → the panel's onAction rule fires → toggles ceiling light.
//
// This avoids duplicating toggle logic in the PIR rule — the panel's
// toggle rule is the single source of truth for what "toggle" means.

import { rule, ruleAction, isCausedBy } from "@uhn/blueprint";
import {
    kitchenLightCeiling,
    kitchenPir,
    kitchenPortableButtonPanelAction,
} from "../resources/kitchen";

// Rule A: Physical or emitAction "toggle" on panel → toggle ceiling light
export const kitchenPanelToggleLight = rule({ description: "Panel toggle → toggle kitchen ceiling light" })
    .onAction(kitchenPortableButtonPanelAction, "toggle")
    .actionHints(kitchenLightCeiling)
    .run((ctx) => {
        if (!isCausedBy(ctx, kitchenPortableButtonPanelAction, "toggle")) return [];
        const isOn = ctx.runtime.getState(kitchenLightCeiling);
        ctx.logger.info("Panel toggle → ceiling light", { isOn, depth: ctx.cause.depth });
        return [
            ruleAction({ type: "setDigitalOutput", resource: kitchenLightCeiling, value: !isOn }),
        ];
    });

// Rule B: PIR activated → emitAction "toggle" on panel (rule chaining)
export const kitchenPirEmitsToggle = rule({ description: "PIR motion → emitAction toggle on panel (rule chaining test)" })
    .onActivated(kitchenPir)
    .actionHints(kitchenPortableButtonPanelAction)
    .run((ctx) => {
        ctx.logger.info("PIR activated — emitting toggle action on panel");
        return [
            ruleAction({ type: "emitAction", resource: kitchenPortableButtonPanelAction, action: "toggle" }),
        ];
    });
