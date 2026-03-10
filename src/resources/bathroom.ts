import { ComplexComputeFn } from "@uhn/blueprint";
import { analogDimmer, analogHumiditySensor, complexResource, inputButtonPush, inputButtonToggle, inputPir, outputIndicatorLight, timerResource } from "../factory/factory";

// --- Base resources ---

export const bathroomDimmerCeiling = analogDimmer({
    edge: "edge1",
    device: "bathroom_dimmer_1",
    pin: 0,
    description: "Dimmable ceiling light in the bathroom",
});

export const bathroomFanSpeed = analogDimmer({
    edge: "edge1",
    device: "bathroom_dimmer_1",
    pin: 1,
    description: "Ventilation fan speed control (0-100%)",
});

export const bathroomHumidity = analogHumiditySensor({
    edge: "edge1",
    device: "sauna_temp_1",
    pin: 2,
    description: "Humidity sensor in the bathroom ceiling",

});

export const bathroomPir = inputPir({
    edge: "edge1",
    device: "bathroom_io8_1",
    pin: 0,
    description: "PIR sensor detecting presence in the bathroom",

});

export const bathroomVentOverride = inputButtonToggle({
    edge: "edge1",
    device: "bathroom_io8_1",
    pin: 1,
    description: "Manual override switch for bathroom ventilation",

});

export const bathroomVentIndicator = outputIndicatorLight({
    edge: "edge1",
    device: "bathroom_io8_1",
    pin: 0,
    description: "LED indicator showing ventilation is active",

});

export const bathroomButtonVent = inputButtonPush({
    edge: "edge1",
    device: "bathroom_io8_1",
    pin: 3,
    description: "Push button to manually start/stop bathroom ventilation",

});

export const bathroomVentTimer = timerResource({
    host: "master",
    description: "Master-hosted timer controlling bathroom ventilation duration",
});

// --- Complex resource: Bathroom Ventilation System ---
// Tile active when fan is running (speed > 0), inactive when off.

const computeFanActive: ComplexComputeFn = (values) => {
    for (const value of values.values()) {
        if (typeof value === "number") return value !== 0;
    }
    return false;
};

export const bathroomVentilation = complexResource({
    host: "master",
    description: "Bathroom ventilation system — humidity, fan, occupancy, and status",
    computeFn: computeFanActive,
    computeResources: [bathroomFanSpeed],
    subResources: [
        { resource: bathroomHumidity, label: "Humidity" },
        { resource: bathroomFanSpeed, label: "Fan Speed" },
        { resource: bathroomPir, label: "Occupancy" },
        { resource: bathroomVentOverride, label: "Override" },
        { resource: bathroomVentIndicator, label: "Status LED" },
    ],
});
