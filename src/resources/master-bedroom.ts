import { inputButtonPush, outputLight, outputIndicatorLight } from "../factory/factory";

export const masterBedroomNightLight = outputIndicatorLight({
    edge: "edge1",
    device: "ihc2",
    pin: 0xA74E5B,
    icon: "lighting:spot",
    description: "Night light in master bedroom",
});

export const masterBedroomSwitchLeftCeiling = inputButtonPush({
    edge: "edge1",
    device: "ihc2",
    pin: 0x9F045C,
    description: "Left ceiling light switch in master bedroom",
});

export const masterBedroomLightLeftCeiling = outputLight({
    edge: "edge1",
    device: "ihc2",
    pin: 0x9F085E,
    icon: "lighting:ceiling",
    description: "Left ceiling light in master bedroom",
});

export const masterBedroomSwitchUnused = inputButtonPush({
    edge: "edge1",
    device: "ihc2",
    pin: 0x9F0B5C,
    description: "Unused IHC input in master bedroom (no IHC function block wired)",
});

export const masterBedroomSwitchRightCeiling = inputButtonPush({
    edge: "edge1",
    device: "ihc2",
    pin: 0x9F125C,
    description: "Right ceiling light switch in master bedroom",
});

export const masterBedroomLightRightCeiling = outputLight({
    edge: "edge1",
    device: "ihc2",
    pin: 0x9F165E,
    icon: "lighting:ceiling",
    description: "Right ceiling light in master bedroom",
});
