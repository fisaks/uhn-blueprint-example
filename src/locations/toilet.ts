import { location } from "@uhn/blueprint";
import {
    toiletLightCeiling,
    toiletLightMirror,
    toiletLightNight,
    toiletLightStarryCeiling,
    toiletMilightCeilingBrightness,
    toiletMilightCeilingColorTemp,
    toiletMilightCeilingHue,
    toiletMilightCeilingMode,
    toiletMilightCeilingNightMode,
    toiletMilightCeilingPower,
    toiletMilightCeilingSaturation,
    toiletMilightCeilingSpeedDown,
    toiletMilightCeilingSpeedUp,
    toiletMilightCeilingWhiteMode,
    toiletPirSensor,
    toiletTimer,
} from "../resources/toilet";
import { viewToiletMilightCeiling } from "../views/toilet";

export const locationToilet = location({
    name: "Toilet",
    icon: "room:toilet",
    items: [
        viewToiletMilightCeiling,
        toiletLightCeiling,
        toiletLightMirror,
        toiletLightStarryCeiling,
        toiletLightNight,
        toiletPirSensor,
        toiletMilightCeilingPower,
        toiletMilightCeilingNightMode,
        toiletMilightCeilingWhiteMode,
        toiletMilightCeilingBrightness,
        toiletMilightCeilingColorTemp,
        toiletMilightCeilingHue,
        toiletMilightCeilingSaturation,
        toiletMilightCeilingMode,
        toiletMilightCeilingSpeedUp,
        toiletMilightCeilingSpeedDown,
        toiletTimer,
    ],
});
