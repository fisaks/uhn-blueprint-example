// src/rules/electricity_price.ts
// Electricity price rules: react to the spot price and query it.
// Prices are snt/kWh including VAT, in 15-minute slots, and come from the master. Every rule runtime
// (master and edge) evaluates its own price rules from the latest snapshot.
//
// The rules below switch the simulated smart plug and the washing machine socket, so they are
// visible in the UI on a dev setup. The thresholds are examples: typical prices are a few snt in
// summer and can be well above 10 snt in winter.

import { hours, rule, ruleAction, type RuleContext } from "@uhn/blueprint";
import { kitchenSocketWashingMachine } from "../resources/kitchen";
import { socketPlug1State } from "../resources/zigbee-smart-plug";

// --- Price limits: the plug goes off when the price is high and comes back when it is low ---
// A limit fires once per crossing, not at every slot, and also once at startup if the price is already
// past it. The two limits are 0.5 snt apart, and onPriceAbove re-arms 0.5 snt below its limit, so the plug
// does not flap when the price hovers around 5 snt. Between 4.5 and 5 snt the plug keeps its state.

export const socketPlugPriceHigh = rule({ description: "Smart plug off when the price goes above 5 snt/kWh" })
    .onPriceAbove(5, { hysteresis: 0.5 })
    .actionHints(socketPlug1State)
    .run(() => [
        ruleAction({ type: "setDigitalOutput", resource: socketPlug1State, value: false }),
    ]);

export const socketPlugPriceLow = rule({ description: "Smart plug on again when the price drops below 4.5 snt/kWh" })
    .onPriceBelow(4.5)
    .actionHints(socketPlug1State)
    .run(() => [
        ruleAction({ type: "setDigitalOutput", resource: socketPlug1State, value: true }),
    ]);

// --- Load shifting: the washing machine socket is on only in the cheapest 2 hours of the day ---
// Re-evaluated at every price slot. `consecutive` picks one unbroken block, so the socket switches on
// once and off once. Without prices for the whole day the answer is false and the socket stays off.

export const washingMachineSocketCheapestHours = rule({ description: "Washing machine socket on only in the cheapest 2 hours of the day" })
    .onPriceChanged()
    .actionHints(kitchenSocketWashingMachine)
    .run((ctx) => {
        const on = ctx.electricity.isAmongCheapest(hours(2), "today", { consecutive: true });
        return [
            ruleAction({ type: "setDigitalOutput", resource: kitchenSocketWashingMachine, value: on }),
        ];
    });

// --- Logging: shows what a price rule sees at every slot, once on master and once on edge1 ---
// ctx.cause.startup is true for the first evaluation after the runtime has received its first prices.

function logPrice(ctx: RuleContext, where: string) {
    ctx.logger.info(`Price slot (${where})`, {
        event: ctx.cause.event,
        startup: "startup" in ctx.cause ? ctx.cause.startup : undefined,
        price: ctx.electricity.currentPrice(),
        hourAverage: ctx.electricity.average({ next: hours(1) }),
        cheapestHourToday: ctx.electricity.cheapestBlock(hours(1), "today", { alignToHour: true })?.start.toISOString(),
        hasToday: ctx.electricity.hasPrices("today"),
    });
}

export const priceLogMaster = rule({ description: "Log the price and a few queries at every slot (master)" })
    .onPriceChanged()
    .executionTarget("master")
    .run((ctx) => {
        logPrice(ctx, "master");
        return [];
    });

export const priceLogEdge = rule({ description: "Log the price and a few queries at every slot (edge1)" })
    .onPriceChanged()
    .executionTarget("edge1")
    .run((ctx) => {
        logPrice(ctx, "edge1");
        return [];
    });
