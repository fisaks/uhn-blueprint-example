import { view, viewCommand } from "@uhn/blueprint";
import {
    kitchenTempDisplayTemperature,
    kitchenTempDisplayHumidity,
    kitchenTempDisplayBattery,
} from "../resources/zigbee-kitchen-temp";
import {
    outdoorTemperature,
    outdoorHumidity,
    outdoorBattery,
} from "../resources/zigbee-outdoor-temp";
import {
    socketPlug1State,
    socketPlug1Power,
    socketPlug1Voltage,
    socketPlug1Current,
} from "../resources/zigbee-smart-plug";

// Kitchen temperature display — display-only, shows temp + humidity left, battery right
export const viewKitchenTemperature = view({
    stateFrom: [],
    stateDisplay: {
        items: [
            { resource: kitchenTempDisplayTemperature, label: "Temperature" },
            { resource: kitchenTempDisplayBattery, label: "Battery" },
            { resource: kitchenTempDisplayHumidity, label: "Humidity" }
            
        ],
    },
    icon: "sensor:temperature",
    description: "Kitchen temperature and humidity display",
    keywords: ["temp", "indoor"],
});

// Outdoor temperature — display-only, shows temp + humidity left, battery right
export const viewOutdoorTemperature = view({
    stateFrom: [],
    stateDisplay: {
        items: [
            { resource: outdoorTemperature, label: "Temperature" },
            { resource: outdoorBattery, label: "Battery" },
            { resource: outdoorHumidity, label: "Humidity" }

        ],
    },
    icon: "sensor:temperature",
    description: "Outdoor temperature and humidity",
    keywords: ["outside", "weather"],
});

// Smart plug — toggleable, shows power/voltage/current as state display
export const viewSocketPlug1 = view({
    stateFrom: [{ resource: socketPlug1State }],
    command: viewCommand({ resource: socketPlug1State, type: "toggle" }),
    stateDisplay: {
        items: [
            { resource: socketPlug1Power, label: "Power" },
            { resource: socketPlug1Voltage, label: "Voltage" },
            { resource: socketPlug1Current, label: "Current" },
        ],
    },
    icon: "power:socket",
    description: "Smart plug with power monitoring",
    keywords: ["plug", "energy"],
});
