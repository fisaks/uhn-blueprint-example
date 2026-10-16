import { timer } from "@uhn/blueprint";
import { inputButtonPush, inputLightSensor, inputPir, outputIndicatorLight, outputLight } from "../factory/factory";

// ── Modbus resources (outdoor_io8_1) ────────────────────────────────────────
export const outdoorLightFront = outputLight({
    edge: "edge1",
    device: "outdoor_io8_1",
    pin: 0,
    icon: "lighting:bulb",
    description: "Outdoor light on the front of the house",
    keywords: ["facade", "garden", "entrance"],
});

export const outdoorIndicatorLightFront = outputIndicatorLight({
    edge: "edge1",
    device: "outdoor_io8_1",
    pin: 1,
    description: "Indicator LED on the hall wall button, mirrors the front outdoor light",
});

export const outdoorTwilightSensor = inputLightSensor({
    edge: "edge1",
    device: "outdoor_io8_1",
    pin: 0,
    icon: "sensor:dark",
    description: "Twilight sensor on the outside wall (active when it is dark)",
    keywords: ["dusk", "dawn", "daylight"],
});

export const outdoorPirDriveway = inputPir({
    edge: "edge1",
    device: "outdoor_io8_1",
    pin: 1,
    icon: "sensor:pir",
    description: "PIR motion sensor covering the driveway",
});

export const outdoorWallButton = inputButtonPush({
    edge: "edge1",
    device: "outdoor_io8_1",
    pin: 2,
    description: "Hall wall button that toggles the front outdoor light",
});

export const outdoorRemoteButton = inputButtonPush({
    edge: "edge1",
    device: "outdoor_io8_1",
    pin: 3,
    description: "Wireless remote button that toggles the front outdoor light",
});

// ── Logical resources ───────────────────────────────────────────────────────
export const outdoorLightPirTimer = timer({
    host: "edge1",
    description: "Auto-off timer for the front outdoor light while the PIR has control",
});
