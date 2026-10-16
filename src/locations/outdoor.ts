import { location } from "@uhn/blueprint";
import {
    outdoorIndicatorLightFront,
    outdoorLightPirTimer,
    outdoorPirDriveway,
    outdoorTwilightSensor,
    outdoorWallButton,
} from "../resources/outdoor";
import { viewOutdoorLightFront } from "../views/outdoor";

export const locationOutdoor = location({
    name: "Outdoor",
    icon: "room:outdoor",
    items: [
        viewOutdoorLightFront,         // view (tap command)
        outdoorTwilightSensor,         // digitalInput (light sensor)
        outdoorPirDriveway,            // digitalInput (pir, push)
        outdoorIndicatorLightFront,    // digitalOutput (indicator)
        outdoorLightPirTimer,          // timer
        outdoorWallButton
    ],
});
