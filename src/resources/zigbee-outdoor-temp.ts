import { analogTemperatureSensor, analogHumiditySensor, analogBatterySensor } from "../factory/factory";

// SNZB-02WD — Outdoor temperature sensor
export const outdoorTemperature = analogTemperatureSensor({
    device: "outdoor_temperature",
    pin: "temperature",
    edge: "edge1",
});

export const outdoorHumidity = analogHumiditySensor({
    device: "outdoor_temperature",
    pin: "humidity",
    edge: "edge1",
});

export const outdoorBattery = analogBatterySensor({
    device: "outdoor_temperature",
    pin: "battery",
    edge: "edge1",
});
