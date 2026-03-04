import { computeSum } from "@uhn/blueprint";
import { complexResource, energyMeterCurrent, energyMeterPower } from "../factory/factory";

// Shelly Pro 3EM — 3-phase energy meter on TCP bus
// Analog input registers start at 1000 (catalog: start=1000, count=75)

// Power (W) — pins 1024, 1044, 1064
export const energyMeterPowerA = energyMeterPower({
    edge: "edge1",
    device: "energy_meter_1",
    pin: 1024,
    description: "Active power on phase A",
    hidden: true,
});

export const energyMeterPowerB = energyMeterPower({
    edge: "edge1",
    device: "energy_meter_1",
    pin: 1044,
    description: "Active power on phase B",
    hidden: true,
});

export const energyMeterPowerC = energyMeterPower({
    edge: "edge1",
    device: "energy_meter_1",
    pin: 1064,
    description: "Active power on phase C",
    hidden: true,
});

// Current (A) — pins 1022, 1042, 1062
export const energyMeterCurrentA = energyMeterCurrent({
    edge: "edge1",
    device: "energy_meter_1",
    pin: 1022,
    description: "Current on phase A",
    hidden: true,
});

export const energyMeterCurrentB = energyMeterCurrent({
    edge: "edge1",
    device: "energy_meter_1",
    pin: 1042,
    description: "Current on phase B",
    hidden: true,
});

export const energyMeterCurrentC = energyMeterCurrent({
    edge: "edge1",
    device: "energy_meter_1",
    pin: 1062,
    description: "Current on phase C",
    hidden: true,
});

export const energyMeterTotal = complexResource({
    edge: "edge1",
    description: "Shelly Pro 3EM — total power across all three phases",
    subResources: [
        { resource: energyMeterPowerA, label: "Phase A", group: "Power" },
        { resource: energyMeterPowerB, label: "Phase B" },
        { resource: energyMeterPowerC, label: "Phase C" },
        { resource: energyMeterCurrentA, label: "Phase A", group: "Current" },
        { resource: energyMeterCurrentB, label: "Phase B" },
        { resource: energyMeterCurrentC, label: "Phase C" },
    ],
    tileSummary: {
        mode: "computed",
        fn: computeSum,
        resources: [energyMeterPowerA, energyMeterPowerB, energyMeterPowerC],
        unit: "W",
    },
});
