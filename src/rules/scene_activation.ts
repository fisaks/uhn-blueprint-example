// src/rules/scene_activation.ts
// Test rules for scene activation — verifies that resolveExecutionTargets
// traces through scene imports to detect resource dependencies.

import { rule, ruleAction } from "@uhn/blueprint";
import { kitchenPanelButtonWallEdgeBottomRight } from "../resources/kitchen";
import { toiletPanelButtonTopRight } from "../resources/toilet";
import { sceneKitchenLightsOff, sceneKitchenEvening } from "../scenes/kitchen";

// Test case 1: trigger (edge1) + scene import (touches resources via scene)
// Expected: executionTarget → "master" (scene import forces master)
const kitchenLightsOffOnBottomRight = rule({ description: "Activate kitchen lights off scene on bottom right button tap" })
    .onTap(kitchenPanelButtonWallEdgeBottomRight)
    .run(() => {
        return [
            ruleAction({ type: "activateScene", scene: sceneKitchenLightsOff }),
        ];
    });

// Test case 2: trigger from different room (edge1) + scene import
// Expected: executionTarget → "master" (scene import forces master)
const kitchenEveningFromToilet = rule({ description: "Activate kitchen evening scene from toilet button" })
    .onTap(toiletPanelButtonTopRight)
    .run(() => {
        return [
            ruleAction({ type: "activateScene", scene: sceneKitchenEvening }),
        ];
    });
