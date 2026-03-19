import { location } from "@uhn/blueprint";
import { masterBedroomNightLight, masterBedroomSwitchUnused } from "../resources/master-bedroom";
import {
    viewMasterBedroomLeftCeilingLight,
    viewMasterBedroomRightCeilingLight,
} from "../views/master-bedroom";

export const locationMasterBedroom = location({
    name: "Master Bedroom",
    icon: "room:bedroom",
    items: [
        viewMasterBedroomLeftCeilingLight,
        viewMasterBedroomRightCeilingLight,
        masterBedroomNightLight,
        masterBedroomSwitchUnused,
    ],
});
