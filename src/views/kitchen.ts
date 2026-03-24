import { view, viewCommand } from "@uhn/blueprint";
import {
    kitchenCeilingTimer,
    kitchenCountertopTimer,
    kitchenLightCeiling,
    kitchenLightCountertops,
    kitchenPanelButtonCountertopTopRow,
    kitchenPanelButtonWallEdgeTopLeft,
    kitchenPir,
} from "../resources/kitchen";

export const viewKitchenCeilingLight = view({
    stateFrom: [{ resource: kitchenLightCeiling }],
    command: viewCommand({ resource: kitchenPanelButtonWallEdgeTopLeft, type: "tap" }),
    stateDisplay: {
        items: [
            { resource: kitchenCeilingTimer, label: "Timer", style: "value" },
            { resource: kitchenPir, style: "flash", icon: "sensor:motion" },
        ],
    },
    icon: "lighting:ceiling",
    description: "Kitchen ceiling light with auto-off timer and motion indicator",
    keywords: ["overhead", "room", "main"],
});

export const viewKitchenCountertopLight = view({
    stateFrom: [{ resource: kitchenLightCountertops }],
    command: viewCommand({ resource: kitchenPanelButtonCountertopTopRow, type: "tap" }),
    stateDisplay: {
        items: [
            { resource: kitchenCountertopTimer, label: "Timer", style: "value" },
        ],
    },
    icon: "lighting:bulb",
    description: "Kitchen countertop lights with auto-off timer",
    keywords: ["worktop"],
});
