// src/rules/master_bedroom_lights.ts
// UHN rule using an IHC input that has no IHC function block wired.
// The full round-trip: physical button press → IHC notification → UHN rule →
// setDigitalOutput → SOAP setResourceValue on IHC output → IHC notification
// → UHN state update.

import { rule, ruleActions } from "@uhn/blueprint";
import {
    masterBedroomLightLeftCeiling,
    masterBedroomSwitchLeftCeiling,
    masterBedroomSwitchUnused,
} from "../resources/master-bedroom";

const masterBedroomUnusedToggleLeftLight = rule({ description: "Unused IHC input toggles left ceiling light directly" })
    .onTap(masterBedroomSwitchUnused)
    .actionHints(masterBedroomLightLeftCeiling)
    .run((ctx) => {
        const isOn = ctx.runtime.getState(masterBedroomLightLeftCeiling);
        ctx.logger.info("Unused input activated — toggling left ceiling light", { isOn });
        return ruleActions([
            { type: "setDigitalOutput", resource: masterBedroomLightLeftCeiling, value: !isOn },
        ]);
    });
