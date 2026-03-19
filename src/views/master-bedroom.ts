import { view } from "@uhn/blueprint";
import {
    masterBedroomLightLeftCeiling,
    masterBedroomLightRightCeiling,
    masterBedroomSwitchLeftCeiling,
    masterBedroomSwitchRightCeiling,
} from "../resources/master-bedroom";

export const viewMasterBedroomLeftCeilingLight = view({
    stateFrom: [{ resource: masterBedroomLightLeftCeiling }],
    command: { resource: masterBedroomSwitchLeftCeiling, type: "tap" },
    icon: "lighting:ceiling",
    description: "Master bedroom left ceiling light",
});

export const viewMasterBedroomRightCeilingLight = view({
    stateFrom: [{ resource: masterBedroomLightRightCeiling }],
    command: { resource: masterBedroomSwitchRightCeiling, type: "tap" },
    icon: "lighting:ceiling",
    description: "Master bedroom right ceiling light",
});
