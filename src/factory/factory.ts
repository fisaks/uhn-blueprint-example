import { BaseInputKind, BaseOutputKind, digitalInput, DigitalInputResourceBase, digitalOutput, DigitalOutputResourceBase } from "@uhn/blueprint";

// Project-local strong literal unions
export type Edge = "edge1"
export type OutputDevice = "kitchen_io8_1" | "kitchen_relay8_1" | "toilet_io8_1"
export type InputDevice = "kitchen_io8_1" | "toilet_io8_1"
export type Pin = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

//export type PInputKind = BaseInputKind | "foo"; // Example of extending kinds
//export type POutputKind = BaseOutputKind | "bar"; // Example of extending kinds
export type PInputKind = BaseInputKind;
export type POutputKind = BaseOutputKind;

// Strong resource types
export type DigitalInputProps = Omit<DigitalInputResourceBase<
    PInputKind, Edge, InputDevice, Pin>, "type" | "inputKind" | "inputType">;

export type DigitalOutputProps = Omit<DigitalOutputResourceBase<
    POutputKind, Edge, OutputDevice, Pin>, "type" | "outputKind">;

// Project-local helpers (optional)
export function inputPir(props: DigitalInputProps) {
    return digitalInput<"pir", Edge, InputDevice, Pin>({
        ...props,
        inputKind: "pir",
        inputType: "push",
    });
}
export function inputButtonPush(props: DigitalInputProps) {
    return digitalInput<"button", Edge, InputDevice, Pin>({
        ...props,
        inputKind: "button",
        inputType: "push",
    });
}
export function inputButtonToggle(props: DigitalInputProps) {
    return digitalInput<"button", Edge, InputDevice, Pin>({
        ...props,
        inputKind: "button",
        inputType: "toggle",
    });
}
export function inputLightSensor(props: DigitalInputProps) {
    return digitalInput<"lightSensor", Edge, InputDevice, Pin>({
        ...props,
        inputKind: "lightSensor",
        inputType: "toggle",
    });
}

export function outputSocket(props: DigitalOutputProps) {
    return digitalOutput<"socket", Edge, OutputDevice, Pin>({
        ...props,
        outputKind: "socket",
    });
}
export function outputLight(props: DigitalOutputProps) {
    return digitalOutput<"light", Edge, OutputDevice, Pin>({
        ...props,
        outputKind: "light",
    });
}
export function outputIndicatorLight(props: DigitalOutputProps) {
    return digitalOutput<"indicator", Edge, OutputDevice, Pin>({
        ...props,
        outputKind: "indicator",
    });
}

export function outputRelay(props: DigitalOutputProps) {
    return digitalOutput<"relay", Edge, OutputDevice, Pin>({
        ...props,
        outputKind: "relay",
    });
}