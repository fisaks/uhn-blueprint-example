import {
    outputSocket,
    analogPowerSensor,
    analogVoltageSensor,
    analogCurrentSensor,
} from "../factory/factory";

// S60ZBTPF — Smart plug (Z2M: socket_plug_1)
export const socketPlug1State = outputSocket({
    device: "socket_plug_1",
    pin: "state",
    edge: "edge1",
});

export const socketPlug1Power = analogPowerSensor({
    device: "socket_plug_1",
    pin: "power",
    edge: "edge1",
    decimalPrecision: 0,
});

export const socketPlug1Voltage = analogVoltageSensor({
    device: "socket_plug_1",
    pin: "voltage",
    edge: "edge1",
    decimalPrecision: 0,
});

export const socketPlug1Current = analogCurrentSensor({
    device: "socket_plug_1",
    pin: "current",
    edge: "edge1",
    decimalPrecision: 2,
});
