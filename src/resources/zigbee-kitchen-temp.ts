import { analogTemperatureSensor, analogHumiditySensor, analogBatterySensor } from "../factory/factory";

// SNZB-02DR2 — Kitchen temperature display
export const kitchenTempDisplayTemperature = analogTemperatureSensor({
    device: "kitchen-temperature-display",
    pin: "temperature",
    edge: "edge1",
});

export const kitchenTempDisplayHumidity = analogHumiditySensor({
    device: "kitchen-temperature-display",
    pin: "humidity",
    edge: "edge1",
});

export const kitchenTempDisplayBattery = analogBatterySensor({
    device: "kitchen-temperature-display",
    pin: "battery",
    edge: "edge1",
});
