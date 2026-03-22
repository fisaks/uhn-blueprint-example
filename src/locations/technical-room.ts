import { location } from "@uhn/blueprint";
import {
    energyMeterTotal
} from "../resources/energy-meter";
import { saunaTemperatureSensor } from "../resources/sauna";
import { viewOutdoorTemperature, viewSocketPlug1 } from "../views/zigbee";

export const locationTechnicalRoom = location({
    name: "Technical Room",
    icon: "room:utility",
    items: [
        energyMeterTotal,        // complex resource (sum of 3 phases)
        saunaTemperatureSensor,  // analogInput (temperature)
        viewOutdoorTemperature,  // view (display-only, zigbee outdoor temp)
        viewSocketPlug1,         // view (toggle, zigbee smart plug with power monitoring)
    ],
});
