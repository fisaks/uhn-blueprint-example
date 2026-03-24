import { view, viewCommand } from "@uhn/blueprint";
import {
    masterBedroomLightLeftCeiling,
    masterBedroomLightRightCeiling,
    masterBedroomSwitchLeftCeiling,
    masterBedroomSwitchRightCeiling,
} from "../resources/master-bedroom";

export const viewMasterBedroomLeftCeilingLight = view({
    stateFrom: [{ resource: masterBedroomLightLeftCeiling }],
    command: viewCommand({ resource: masterBedroomSwitchLeftCeiling, type: "tap" }),
    icon: "lighting:ceiling",
    description: "Master bedroom left ceiling light",
});

export const viewMasterBedroomRightCeilingLight = view({
    stateFrom: [{ resource: masterBedroomLightRightCeiling }],
    command: viewCommand({ resource: masterBedroomSwitchRightCeiling, type: "tap" }),
    icon: "lighting:ceiling",
    description: "Master bedroom right ceiling light",
});
