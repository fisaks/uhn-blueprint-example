import {
    outputSocket,
    analogPowerSensor,
    analogVoltageSensor,
    analogCurrentSensor,
} from "../factory/factory";

// S60ZBTPF — Smart plug (Z2M: portable-socket-plug)
export const socketPlug1State = outputSocket({
    device: "portable-socket-plug",
    pin: "state",
    edge: "edge1",
});

export const socketPlug1Power = analogPowerSensor({
    device: "portable-socket-plug",
    pin: "power",
    edge: "edge1",
    decimalPrecision: 0,
});

export const socketPlug1Voltage = analogVoltageSensor({
    device: "portable-socket-plug",
    pin: "voltage",
    edge: "edge1",
    decimalPrecision: 0,
});

export const socketPlug1Current = analogCurrentSensor({
    device: "portable-socket-plug",
    pin: "current",
    edge: "edge1",
    decimalPrecision: 2,
});
