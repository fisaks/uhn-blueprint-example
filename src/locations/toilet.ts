import { location } from "@uhn/blueprint";
import {
    toiletLightMirror,
    toiletLightNight,
    toiletLightStarryCeiling,
    toiletPirSensor
} from "../resources/toilet";
import { viewToiletMilightCeiling } from "../views/toilet";

export const locationToilet = location({
    name: "Toilet",
    icon: "room:toilet",
    items: [
        viewToiletMilightCeiling,
        toiletLightMirror,
        toiletLightStarryCeiling,
        toiletLightNight,
    ],
});
