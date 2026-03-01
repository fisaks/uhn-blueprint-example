import { rule } from "@uhn/blueprint";
import { saunaTemperatureSensor } from "../resources/sauna";

export const saunaTooHot = rule({})
    .onAbove(saunaTemperatureSensor, 100, { hysteresis: 5 })
    .run((ctx) => {
        ctx.logger.warn("Sauna temperature above 100°C!");
        return [];
    });
