import { view } from "@uhn/blueprint";
import {
    kitchenLightCeiling,
    kitchenPanelButtonWallEdgeTopLeft,
    kitchenPir,
    kitchenTimer,
} from "../resources/kitchen";

export const kitchenCeilingLightView = view({
    stateFrom: [{ resource: kitchenLightCeiling }],
    command: { resource: kitchenPanelButtonWallEdgeTopLeft, type: "tap" },
    stateDisplay: {
        items: [
            { resource: kitchenTimer, label: "Timer", style: "value" },
            { resource: kitchenPir, style: "flash" ,icon: "motion" },
        ],
    },
    description: "Kitchen ceiling light controlled by wall button, with timer countdown and motion indicator",
});
