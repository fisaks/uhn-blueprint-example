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

// Kitchen temperature display — display-only, hero carousel for temp/humidity, battery icon top-right
export const viewKitchenTemp = view({
    stateFrom: [],
    stateDisplay: {
        hero: [
            { resource: kitchenTempDisplayTemperature, label: "Temperature" },
            { resource: kitchenTempDisplayHumidity, label: "Humidity" },
        ],
        topRight: [
            {
                resource: kitchenTempDisplayBattery,
                icon: "energy:battery",
                tooltip: "value",
                colorMap: [
                    { below: 20, color: "error" },
                    { below: 50, color: "warning" },
                    { above: 49, color: "success" },
                ],
                iconMap: [
                    { below: 20, icon: "energy:battery-low" },
                    { below: 50, icon: "energy:battery-half" },
                ],
            },
        ],
    },
    icon: "sensor:temperature",
    description: "Kitchen temperature and humidity display",
    keywords: ["temp", "indoor"],
});

// Outdoor temperature — display-only, hero carousel for temp/humidity, battery icon top-right
export const viewOutdoorTemp = view({
    stateFrom: [],
    stateDisplay: {
        hero: [
            { resource: outdoorTemperature, label: "Temperature" },
            { resource: outdoorHumidity, label: "Humidity" },
        ],
        topRight: [
            {
                resource: outdoorBattery,
                icon: "energy:battery",
                tooltip: "value",
                colorMap: [
                    { below: 20, color: "error" },
                    { below: 50, color: "warning" },
                    { above: 49, color: "success" },
                ],
                iconMap: [
                    { below: 20, icon: "energy:battery-low" },
                    { below: 50, icon: "energy:battery-half" },
                ],
            },
        ],
    },
    icon: "sensor:temperature",
    description: "Outdoor temperature and humidity",
    keywords: ["outside", "weather"],
});

// Smart plug — toggleable, power left, voltage/current right
export const viewSocketPlug1 = view({
    stateFrom: [{ resource: socketPlug1State }],
    command: viewCommand({ resource: socketPlug1State, type: "toggle" }),
    stateDisplay: {
        left: [
            { resource: socketPlug1Power, label: "Power" },
        ],
        right: [
            { resource: socketPlug1Voltage, label: "Voltage" },
            { resource: socketPlug1Current, label: "Current" },
        ],
    },
    icon: "power:socket",
    description: "Smart plug with power monitoring",
    keywords: ["plug", "energy"],
});
