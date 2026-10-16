import { view, viewCommand } from "@uhn/blueprint";
import {
    outdoorLightFront,
    outdoorLightPirTimer,
    outdoorPirDriveway,
    outdoorWallButton,
} from "../resources/outdoor";

export const viewOutdoorLightFront = view({
    stateFrom: [{ resource: outdoorLightFront }],
    command: viewCommand({ resource: outdoorWallButton, type: "tap" }),
    stateDisplay: {
        left: [
            { resource: outdoorLightPirTimer, label: "Timer" },
        ],
        badge: [
            { resource: outdoorPirDriveway, icon: "sensor:motion", showWhen: "active" },
        ],
    },
    name: "Outdoor Front Light",
    icon: "lighting:bulb",
    description: "Front outdoor light with dusk automation, driveway motion and manual toggle",
    keywords: ["facade", "garden", "entrance"],
});
