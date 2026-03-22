import { location } from "@uhn/blueprint";
import {
    kitchenCeilingTimer,
    kitchenLightDiningTable,
    kitchenLightNight,
    kitchenPanelIndicatorWallEdgeTop,
    kitchenPir,
    kitchenSocketCoffeeMachine,
    kitchenSocketCountertop,
    kitchenVirtualDimmer,
    kitchenVirtualToggleNightMode
} from "../resources/kitchen";
import {
    sceneKitchenEvening,
    sceneKitchenLightsOff,
} from "../scenes/kitchen";
import {
    viewKitchenCeilingLight,
    viewKitchenCountertopLight,
} from "../views/kitchen";
import { viewKitchenTemperature } from "../views/zigbee";

export const locationKitchen = location({
    name: "Kitchen",
    icon: "room:kitchen",
    items: [
        viewKitchenCeilingLight,              // view (tap command)
        viewKitchenCountertopLight,           // view (tap command)
        viewKitchenTemperature,               // view (display-only, zigbee temp sensor)
        kitchenLightDiningTable,              // digitalOutput (light)
        kitchenLightNight,                    // digitalOutput (light)
        kitchenPir,                           // digitalInput (pir, push)
        kitchenSocketCountertop,              // digitalOutput (socket)
        kitchenSocketCoffeeMachine,           // digitalOutput (socket)
        kitchenPanelIndicatorWallEdgeTop,     // digitalOutput (indicator)
        kitchenVirtualToggleNightMode,        // virtualDigitalInput (toggle)
        kitchenVirtualDimmer,                 // virtualAnalogOutput (slider)
        kitchenCeilingTimer,                  // timer
        sceneKitchenLightsOff,                // scene
        sceneKitchenEvening,                  // scene
    ],
});
