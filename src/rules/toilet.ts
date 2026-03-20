import { rule, ruleActions } from "@uhn/blueprint";
import {
    toiletMilightCeilingColorTemp,
    toiletMilightCeilingHue,
    toiletMilightCeilingSaturation,
    toiletMilightCeilingWhiteMode,
    toiletMilightColor,
    toiletMilightWhite,
} from "../resources/toilet";

// When the color virtual slider changes → set saturation to 100 (vivid) + set hue
export const toiletMilightColorRule = rule({ description: "Mi-Light color mode: sets hue + saturation to vivid" })
    .onChanged(toiletMilightColor)
    .actionHints(toiletMilightCeilingSaturation, toiletMilightCeilingHue)
    .run((ctx) => {
        const hue = ctx.runtime.getState(toiletMilightColor) as number;
        ctx.logger.info("Color mode: hue=" + hue);
        return ruleActions([
            { type: "setAnalogOutput", resource: toiletMilightCeilingSaturation, value: 100 },
            { type: "setAnalogOutput", resource: toiletMilightCeilingHue, value: hue },
        ]);
    });

// When the white virtual slider changes → emit white mode signal + set CCT
export const toiletMilightWhiteRule = rule({ description: "Mi-Light white mode: enters white mode + sets CCT" })
    .onChanged(toiletMilightWhite)
    .actionHints(toiletMilightCeilingWhiteMode, toiletMilightCeilingColorTemp)
    .run((ctx) => {
        const cct = ctx.runtime.getState(toiletMilightWhite) as number;
        ctx.logger.info("White mode: cct=" + cct);
        return ruleActions([
            { type: "emitSignal", resource: toiletMilightCeilingWhiteMode, value: true },
            { type: "setAnalogOutput", resource: toiletMilightCeilingColorTemp, value: cct },
        ]);
    });
