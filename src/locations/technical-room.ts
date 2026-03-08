import { location } from "@uhn/blueprint";
import {
    energyMeterTotal
} from "../resources/energy-meter";
import { saunaTemperatureSensor } from "../resources/sauna";

export const locationTechnicalRoom = location({
    name: "Technical Room",
    icon: "room:utility",
    items: [
        energyMeterTotal,      // complex resource (sum of 3 phases)
        saunaTemperatureSensor,  // analogInput (temperature)
    ],
});
