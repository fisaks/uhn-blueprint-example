import { scene } from "@uhn/blueprint";
import {
    kitchenLightCeiling,
    kitchenLightCountertops,
    kitchenLightDiningTable,
    kitchenLightNight,
} from "../resources/kitchen";

export const sceneKitchenLightsOff = scene({
    name: "Kitchen Lights Off",
    description: "Turn off all kitchen lights",
    commands: [
        { type: "setDigitalOutput", resource: kitchenLightCeiling, value: false },
        { type: "setDigitalOutput", resource: kitchenLightDiningTable, value: false },
        { type: "setDigitalOutput", resource: kitchenLightCountertops, value: false },
        { type: "setDigitalOutput", resource: kitchenLightNight, value: false },
    ],
});

export const sceneKitchenEvening = scene({
    name: "Kitchen Evening",
    description: "Cozy evening lighting with dining table and night light",
    keywords: ["dinner", "romantic"],
    icon: "scene:night",
    commands: [
        { type: "setDigitalOutput", resource: kitchenLightCeiling, value: false },
        { type: "setDigitalOutput", resource: kitchenLightDiningTable, value: true },
        { type: "setDigitalOutput", resource: kitchenLightCountertops, value: false },
        { type: "setDigitalOutput", resource: kitchenLightNight, value: true },
    ],
});
