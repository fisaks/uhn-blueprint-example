// src/rules/toilet_mirror_light.ts
import { rule, ruleActions } from "@uhn/blueprint";
import { toiletLightMirror, toiletPanelButtonBottomLeft, toiletPirSensor, toiletTimer } from "../resources/toilet";

const toiletPirStartsMirrorTimer = rule({})
    .onActivated(toiletPirSensor)
    .suppress(10000)
    .run((ctx) => {
        ctx.logger.info("Toilet PIR activated - turning on toilet mirror light for 30 sec");
        ctx.timers.start(toiletTimer, 30 * 1000, "restart");
        return [];
    });

const turnOnToiletMirrorLight = rule({})
    .onTimerActivated(toiletTimer)
    .onTap(toiletPanelButtonBottomLeft)
    .run((ctx) => {
        if (ctx.runtime.getState(toiletLightMirror)) {//alreadyRunning
            return [];
        }
        if (ctx.cause.event === "tap") {
            ctx.mute.rule(toiletPirStartsMirrorTimer, 10 * 60 * 1000, "buttonManualTap");
        }
        ctx.logger.info("Turning on toilet mirror light", ctx.cause);
        return ruleActions([
            { type: "setOutput", resource: toiletLightMirror, value: true }
        ]);
    });

const turnOffToiletMirrorLight = rule({})
    .onTimerDeactivated(toiletTimer)
    .onTap(toiletPanelButtonBottomLeft)
    .run((ctx) => {
        if (!ctx.runtime.getState(toiletLightMirror)) {
            return [];
        }
        ctx.logger.info("Turning off toilet mirror light", ctx.cause);
        if (ctx.cause.event !== "timerDeactivated") {
            ctx.timers.clear(toiletTimer);
        }
        if (ctx.cause.event === "tap") {
            ctx.mute.clearMute(toiletPirStartsMirrorTimer, "buttonManualTap");
            ctx.mute.rule(toiletPirStartsMirrorTimer, 10_000);
        }
        return ruleActions([
            { type: "setOutput", resource: toiletLightMirror, value: false }
        ]);
    });
