import { analogTemperatureSensor, analogHumiditySensor, analogBatterySensor } from "../factory/factory";

// SNZB-02DR2 — Kitchen temperature display
export const kitchenTempDisplayTemperature = analogTemperatureSensor({
    device: "kitchen_temperature_display",
    pin: "temperature",
    edge: "edge1",
});

export const kitchenTempDisplayHumidity = analogHumiditySensor({
    device: "kitchen_temperature_display",
    pin: "humidity",
    edge: "edge1",
});

export const kitchenTempDisplayBattery = analogBatterySensor({
    device: "kitchen_temperature_display",
    pin: "battery",
    edge: "edge1",
});
