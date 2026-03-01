import { analogTemperatureSensor } from "../factory/factory";

export const saunaTemperatureSensor = analogTemperatureSensor({
    edge: "edge1",
    device: "sauna_temp_1",
    pin: 0,
    description: "Sauna temperature sensor",
});
