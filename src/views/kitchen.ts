import { view } from "@uhn/blueprint";
import {
    kitchenCeilingTimer,
    kitchenCountertopTimer,
    kitchenLightCeiling,
    kitchenLightCountertops,
    kitchenPanelButtonCountertopTopRow,
    kitchenPanelButtonWallEdgeTopLeft,
    kitchenPir,
} from "../resources/kitchen";

export const kitchenCeilingLightView = view({
    stateFrom: [{ resource: kitchenLightCeiling }],
    command: { resource: kitchenPanelButtonWallEdgeTopLeft, type: "tap" },
    stateDisplay: {
        items: [
            { resource: kitchenCeilingTimer, label: "Timer", style: "value" },
            { resource: kitchenPir, style: "flash", icon: "sensor:motion" },
        ],
    },
    icon: "lighting:ceiling",
    description: "Kitchen ceiling light with auto-off timer and motion indicator",
});

export const kitchenCountertopLightView = view({
    stateFrom: [{ resource: kitchenLightCountertops }],
    command: { resource: kitchenPanelButtonCountertopTopRow, type: "tap" },
    stateDisplay: {
        items: [
            { resource: kitchenCountertopTimer, label: "Timer", style: "value" },
        ],
    },
    icon: "lighting:bulb",
    description: "Kitchen countertop lights with auto-off timer",
});
