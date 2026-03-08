import { location } from "@uhn/blueprint";
import {
    kitchenCeilingTimer,
    kitchenLightDiningTable,
    kitchenLightNight,
    kitchenPanelIndicatorWallEdgeTop,
    kitchenPir,
    kitchenSocketCoffeeMachine,
    kitchenSocketCountertop,
    kitchenSocketForToaster,
    kitchenVirtualDimmer,
    kitchenVirtualToggleNightMode,
} from "../resources/kitchen";
import {
    kitchenCeilingLightView,
    kitchenCountertopLightView,
} from "../views/kitchen";

export const locationKitchen = location({
    name: "Kitchen",
    icon: "room:kitchen",
    items: [
        kitchenCeilingLightView,              // view (tap command)
        kitchenCountertopLightView,           // view (tap command)
        kitchenLightDiningTable,              // digitalOutput (light)
        kitchenLightNight,                    // digitalOutput (light)
        kitchenPir,                           // digitalInput (pir, push)
        kitchenSocketForToaster,              // digitalOutput (socket)
        kitchenSocketCountertop,              // digitalOutput (socket)
        kitchenSocketCoffeeMachine,           // digitalOutput (socket)
        kitchenPanelIndicatorWallEdgeTop,     // digitalOutput (indicator)
        kitchenVirtualToggleNightMode,        // virtualDigitalInput (toggle)
        kitchenVirtualDimmer,                 // virtualAnalogOutput (slider)
        kitchenCeilingTimer,                  // timer
    ],
});
