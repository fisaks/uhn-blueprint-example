import {
    analogInput, AnalogInputResourceBase, analogOutput, AnalogOutputResourceBase,
    BaseAnalogInputKind, BaseAnalogOutputKind,
    BaseInputKind, BaseOutputKind,
    complex, ComplexResourceBase,
    digitalInput, DigitalInputResourceBase, digitalOutput, DigitalOutputResourceBase,
    TimerResourceBase, timer,
    virtualInput, VirtualInputResourceBase,
} from "@uhn/blueprint";

// Project-local strong literal unions
export type Edge = "edge1"
export type Host = Edge | "master"
export type OutputDevice = "kitchen_io8_1" | "kitchen_relay8_1" | "toilet_io8_1" | "bathroom_io8_1"
export type InputDevice = "kitchen_io8_1" | "toilet_io8_1" | "bathroom_io8_1"
export type AnalogInputDevice = "sauna_temp_1" | "energy_meter_1"
export type AnalogOutputDevice = "bathroom_dimmer_1"
export type Pin = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type AnalogPin = 0 | 1 | 2 | 3;
export type EnergyMeterPin =
    | 1000 | 1001 | 1002 | 1003 | 1004 | 1005 | 1006 | 1007 | 1008 | 1009
    | 1010 | 1011 | 1012 | 1013 | 1014 | 1015 | 1016 | 1017 | 1018 | 1019
    | 1020 | 1021 | 1022 | 1023 | 1024 | 1025 | 1026 | 1027 | 1028 | 1029
    | 1030 | 1031 | 1032 | 1033 | 1034 | 1035 | 1036 | 1037 | 1038 | 1039
    | 1040 | 1041 | 1042 | 1043 | 1044 | 1045 | 1046 | 1047 | 1048 | 1049
    | 1050 | 1051 | 1052 | 1053 | 1054 | 1055 | 1056 | 1057 | 1058 | 1059
    | 1060 | 1061 | 1062 | 1063 | 1064 | 1065 | 1066 | 1067 | 1068 | 1069
    | 1070 | 1071 | 1072 | 1073 | 1074;

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

// Analog resource props
export type AnalogInputProps = Omit<AnalogInputResourceBase<
    BaseAnalogInputKind, Edge, AnalogInputDevice, AnalogPin>, "type" | "analogInputKind">;

export type AnalogOutputProps = Omit<AnalogOutputResourceBase<
    BaseAnalogOutputKind, Edge, AnalogOutputDevice, AnalogPin>, "type" | "analogOutputKind">;

// Analog factory helpers
export function analogTemperatureSensor(props: AnalogInputProps) {
    return analogInput<"temperature", Edge, AnalogInputDevice, AnalogPin>({
        unit: "°C",
        ...props,
        analogInputKind: "temperature",
    });
}
export function analogHumiditySensor(props: AnalogInputProps) {
    return analogInput<"humidity", Edge, AnalogInputDevice, AnalogPin>({
        unit: "%",
        ...props,
        analogInputKind: "humidity",
    });
}
export function analogPowerSensor(props: AnalogInputProps) {
    return analogInput<"power", Edge, AnalogInputDevice, AnalogPin>({
        unit: "W",
        ...props,
        analogInputKind: "power",
    });
}
export function analogDimmer(props: AnalogOutputProps) {
    return analogOutput<"dimmer", Edge, AnalogOutputDevice, AnalogPin>({
        min: 0, max: 100, step: 1, unit: "%",
        ...props,
        analogOutputKind: "dimmer",
    });
}
export function analogValve(props: AnalogOutputProps) {
    return analogOutput<"valve", Edge, AnalogOutputDevice, AnalogPin>({
        min: 0, max: 100, step: 1, unit: "%",
        ...props,
        analogOutputKind: "valve",
    });
}

// Energy meter helpers (Shelly Pro 3EM — wide pin range)
export type EnergyMeterAnalogInputProps = Omit<AnalogInputResourceBase<
    BaseAnalogInputKind, Edge, "energy_meter_1", EnergyMeterPin>, "type" | "analogInputKind">;

export function energyMeterPower(props: EnergyMeterAnalogInputProps) {
    return analogInput<"power", Edge, "energy_meter_1", EnergyMeterPin>({
        unit: "W",
        ...props,
        analogInputKind: "power",
    });
}

export function energyMeterCurrent(props: EnergyMeterAnalogInputProps) {
    return analogInput<"current", Edge, "energy_meter_1", EnergyMeterPin>({
        unit: "A",
        ...props,
        analogInputKind: "current",
    });
}

// Complex resource props
export type ComplexProps = Omit<ComplexResourceBase<Host>, "type">;

export function complexResource(props: ComplexProps) {
    return complex<Host>(props);
}

// Timer resource props
export type TimerProps = Omit<TimerResourceBase<Host>, "type">;

export function timerResource(props: TimerProps) {
    return timer<Host>(props);
}

// Virtual input resource props
export type VirtualInputProps = Omit<VirtualInputResourceBase<Host>, "type" | "inputType">;

export function virtualButton(props: VirtualInputProps) {
    return virtualInput<Host>({ ...props, inputType: "push" });
}

export function virtualToggle(props: VirtualInputProps) {
    return virtualInput<Host>({ ...props, inputType: "toggle" });
}