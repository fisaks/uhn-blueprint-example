import { location } from "@uhn/blueprint";
import {
    bathroomButtonVent,
    bathroomDimmerCeiling,
    bathroomHumidity,
    bathroomVentilation,
    bathroomVentTimer,
} from "../resources/bathroom";
import { viewBathroomDimmer, viewBathroomVentilation } from "../views/bathroom";

export const locationBathroom = location({
    name: "Bathroom",
    icon: "room:bathroom",
    items: [
        viewBathroomDimmer,          // view with setAnalog command (slider)
        viewBathroomVentilation,     // view with setAnalog + stateDisplay
        bathroomVentilation,         // complex resource
        bathroomDimmerCeiling,       // analogOutput resource (inline slider)
        bathroomHumidity,            // analogInput resource
        bathroomButtonVent,          // digitalInput (push button)
        bathroomVentTimer,           // timer resource
    ],
});
