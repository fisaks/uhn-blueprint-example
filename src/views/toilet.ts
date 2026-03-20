import { view } from "@uhn/blueprint";
import {
    toiletMilightCeilingBrightness,
    toiletMilightCeilingPower,
} from "../resources/toilet";

export const viewToiletMilightCeiling = view({
    stateFrom: [{ resource: toiletMilightCeilingPower }],
    command: { resource: toiletMilightCeilingBrightness, type: "setAnalog", min: 0, max: 100, step: 5, unit: "%", defaultOnValue: 70 },
    icon: "lighting:ceiling",
    description: "Mi-Light RGB+CCT ceiling downlight with brightness control",
    keywords: ["milight", "rgb", "downlight"],
});
