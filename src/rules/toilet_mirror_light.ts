// src/rules/toilet_mirror_light.ts
import { minutes, rule, ruleActions, seconds } from "@uhn/blueprint";
import { toiletLightMirror, toiletPanelButtonBottomLeft, toiletPirSensor, toiletTimer } from "../resources/toilet";

const toiletPirStartsMirrorTimer = rule({})
    .onActivated(toiletPirSensor)
    .suppress(seconds(10))
    .actionHints(toiletTimer)
    .run((ctx) => {
        ctx.logger.info("Toilet PIR activated - turning on toilet mirror light for 30 sec");
        ctx.timers.start(toiletTimer, seconds(30), "restart");
        return [];
    });

const turnOnToiletMirrorLight = rule({})
    .onTimerActivated(toiletTimer)
    .onTap(toiletPanelButtonBottomLeft)
    .actionHints(toiletLightMirror)
    .run((ctx) => {
        if (ctx.runtime.getState(toiletLightMirror)) {//alreadyRunning
            return [];
        }
        if (ctx.cause.event === "tap") {
            ctx.mute.rule(toiletPirStartsMirrorTimer, minutes(10), "buttonManualTap");
        }
        ctx.logger.info("Turning on toilet mirror light", ctx.cause);
        return ruleActions([
            { type: "setDigitalOutput", resource: toiletLightMirror, value: true }
        ]);
    });

const turnOffToiletMirrorLight = rule({})
    .onTimerDeactivated(toiletTimer)
    .onTap(toiletPanelButtonBottomLeft)
    .actionHints(toiletLightMirror, toiletTimer)
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
            ctx.mute.rule(toiletPirStartsMirrorTimer, seconds(10));
        }
        return ruleActions([
            { type: "setDigitalOutput", resource: toiletLightMirror, value: false }
        ]);
    });
