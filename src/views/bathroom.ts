import { InteractionView, view } from "@uhn/blueprint";
import {
    bathroomDimmerCeiling,
    bathroomFanSpeed,
    bathroomHumidity,
    bathroomPir,
    bathroomVentilation,
    bathroomVentTimer,
} from "../resources/bathroom";

const stateFrom:InteractionView["stateFrom"] = [{ resource: bathroomDimmerCeiling, activeWhen: { above: 0 } }];

export const viewBathroomDimmer = view({
    stateFrom,
    command: { resource: bathroomDimmerCeiling, type: "setAnalog", min: 0, max: 100, step: 5, unit: "%" },
    icon: "lighting:ceiling",
    description: "Dimmable bathroom ceiling light",
});

export const viewBathroomVentilation = view({
    stateFrom: [{ resource: bathroomFanSpeed, activeWhen: { above: 0 } }],
    command: { resource: bathroomFanSpeed, type: "setAnalog", min: 0, max: 100, step: 10, unit: "%" },
    stateDisplay: {
        items: [
            { resource: bathroomHumidity, label: "Humidity", unit: "%", style: "value" },
            { resource: bathroomVentTimer, label: "Timer", style: "value" },
            { resource: bathroomPir, style: "indicator", icon: "sensor:motion" },
        ],
    },
    icon: "control:speed",
    description: "Bathroom ventilation fan speed with humidity and timer info",
});
