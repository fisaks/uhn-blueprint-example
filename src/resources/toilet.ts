import {
    computeAllOn, timer,
    milightPower, milightNightMode, milightWhiteMode, milightSpeedUp, milightSpeedDown,
    milightBrightness, milightColorTemp, milightHue, milightSaturation, milightMode,
} from "@uhn/blueprint";
import {
    complexResource, virtualAnalog,
    inputButtonPush, inputButtonToggle, inputLightSensor, inputPir,
    outputIndicatorLight, outputLight, outputRelay,
} from "../factory/factory";

// ── IHC resources (ihc2 controller) ─────────────────────────────────────────
export const toiletLightCeiling = outputLight({
    edge: "edge1",
    device: "ihc2",
    pin: 0x7b495b,
    description: "Located on the ceiling above the toilet area (IHC relay, also gates Mi-Light mains)",
});
export const toiletPanelIndicatorLightTop = outputIndicatorLight({
    edge: "edge1",
    device: "ihc2",
    pin: 0x7b595b,
    description: "Indicates status in the top button row of the panel",
});
export const toiletPanelButtonTopLeft = inputButtonPush({
    edge: "edge1",
    device: "ihc2",
    pin: 0x7b555a,
    description: "Top left button on panel, to the left side of the toilet door when walking in",
});
export const toiletPanelButtonTopRight = inputButtonPush({
    edge: "edge1",
    device: "ihc2",
    pin: 0x7b565a,
    description: "Top right button on panel, to the right side of the toilet door when walking in",
});

// ── Modbus resources (toilet_io8_1) ─────────────────────────────────────────
export const toiletLightMirror = outputLight({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 1,
    description: "Located around the mirror above the sink",
});
export const toiletLightStarryCeiling = outputLight({
    edge: "edge1",
    device: "toilet_io8_1",
    name:"Toilet starlight",
    pin: 2,
    description: "Fiber light in the ceiling to simulate starry sky",
});
export const toiletLightNight = outputLight({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 3,
    description: "Led in the ceiling cornice for night light",
});
export const toiletPanelIndicatorLightBottom = outputIndicatorLight({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 5,
    description: "Indicates status in the bottom button row of the panel",
});
export const toiletRelayTest = outputRelay({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 6,
    description: "Just a test relay output",
});

export const toiletPanelButtonBottomLeft = inputButtonPush({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 2,
    description: "Bottom left button on panel, to the left side of the toilet door when walking in",
});
export const toiletPanelButtonBottomRight = inputButtonPush({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 3,
    description: "Bottom right button on panel, to the right side of the toilet door when walking in",
});
export const toiletPirSensor = inputPir({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 4,
    description: "PIR sensor to detect presence in the toilet",
});

export const toiletButtonToggle = inputButtonToggle({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 5,
    description: "Just a test button for toggle input",
});

export const toiletLightSensor = inputLightSensor({
    edge: "edge1",
    device: "toilet_io8_1",
    pin: 6,
    description: "Light sensor to measure ambient light level in the toilet",
});


export const toiletTimer = timer({ host: "edge1" })

// ── Mi-Light FUT069 RGB+CCT ceiling downlight (zone 4 on iBox2) ────────────
// Pins assigned automatically by milight factories
export const toiletMilightCeilingPower = milightPower({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light FUT069 RGB+CCT ceiling downlight power",
});
export const toiletMilightCeilingNightMode = milightNightMode({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight night mode (very dim)",
});
export const toiletMilightCeilingWhiteMode = milightWhiteMode({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight white mode (RGB off, CCT only)",
});
export const toiletMilightCeilingSpeedUp = milightSpeedUp({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight effect speed increase",
});
export const toiletMilightCeilingSpeedDown = milightSpeedDown({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight effect speed decrease",
});
export const toiletMilightCeilingBrightness = milightBrightness({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight brightness (0-100%)",
});
export const toiletMilightCeilingColorTemp = milightColorTemp({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight color temperature (0=warm, 100=cool)",
});
export const toiletMilightCeilingHue = milightHue({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight hue (0-255, enters color mode)",
});
export const toiletMilightCeilingSaturation = milightSaturation({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight saturation (0=white, 100=vivid color)",
});
export const toiletMilightCeilingMode = milightMode({
    edge: "edge1", device: "milight-toilet",
    description: "Mi-Light ceiling downlight effect mode (1-9)",
});

// ── Complex resource: Mi-Light tile ────────────────────────────────────────
// ON only when BOTH mains relay (IHC) AND soft power (Mi-Light) are on
export const toiletMilightCeiling = complexResource({
    host: "master",
    description: "Mi-Light RGB+CCT ceiling downlight (mains relay + soft power)",
    computeFn: computeAllOn,
    computeResources: [toiletLightCeiling],
    subResources: [
        { resource: toiletMilightCeilingPower, label: "Power", group: "Power" },
        { resource: toiletMilightCeilingNightMode, label: "Night Mode" },
        { resource: toiletMilightCeilingBrightness, label: "Brightness", group: "Light" },
        { resource: toiletMilightCeilingColorTemp, label: "Color Temp" },
        { resource: toiletMilightCeilingHue, label: "Hue", group: "Color" },
        { resource: toiletMilightCeilingSaturation, label: "Saturation" },
        { resource: toiletMilightCeilingMode, label: "Effect Mode", group: "Effects" },
        { resource: toiletMilightCeilingSpeedUp, label: "Speed Up" },
        { resource: toiletMilightCeilingSpeedDown, label: "Speed Down" },
    ],
});

// ── Virtual controls: color and white mode ──────────────────────────────────
export const toiletMilightColor = virtualAnalog({
    host: "master", min: 0, max: 255, step: 1,
    description: "Mi-Light color mode (sets hue + saturation to vivid)",
});
export const toiletMilightWhite = virtualAnalog({
    host: "master", min: 0, max: 100, step: 1, unit: "%",
    description: "Mi-Light white mode (warm→cool color temperature)",
});
