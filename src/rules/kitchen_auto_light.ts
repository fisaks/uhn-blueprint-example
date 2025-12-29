// rules/kitchen_auto_light.ts

import { rule } from "@uhn/blueprint";
import { kitchenLightNight, kitchenPanelButtonWallEdgeTopRight, kitchenSocketForToaster, kitchenTimer } from "../resources/kitchen";
import { toiletButtonToggle } from "../resources/toilet";

const kitchenAutoLight = rule({})
    .onTap(kitchenPanelButtonWallEdgeTopRight)
    .run((ctx) => {
        ctx.timers.start(kitchenTimer, 5 * 60 * 1000); // 5 minutes
        ctx.runtime.getState(kitchenLightNight);
        ctx.runtime.getState(kitchenPanelButtonWallEdgeTopRight);
        ctx.runtime.getState(toiletButtonToggle);
        ctx.runtime.getState(kitchenSocketForToaster);
        return [{ type: "setOutput", resource: kitchenLightNight, value: true }];
    })



