import { rule, ruleAction } from "@uhn/blueprint";
import {
    toiletMilightCeilingColorTemp,
    toiletMilightCeilingHue,
    toiletMilightCeilingSaturation,
    toiletMilightCeilingWhiteMode,
    toiletMilightColor,
    toiletMilightColorPicker,
    toiletMilightWhite,
} from "../resources/toilet";

// When the color virtual slider changes → set saturation to 100 (vivid) + set hue
export const toiletMilightColorRule = rule({ description: "Mi-Light color mode: sets hue + saturation to vivid" })
    .onChanged(toiletMilightColor)
    .actionHints(toiletMilightCeilingSaturation, toiletMilightCeilingHue)
    .run((ctx) => {
        const hue = ctx.runtime.getState(toiletMilightColor) as number;
        ctx.logger.info("Color mode: hue=" + hue);
        return [
            ruleAction({ type: "setAnalogOutput", resource: toiletMilightCeilingSaturation, value: 100 }),
            ruleAction({ type: "setAnalogOutput", resource: toiletMilightCeilingHue, value: hue }),
        ];
    });

// When the color picker dropdown changes → forward value to color slider (triggers toiletMilightColorRule)
export const toiletMilightColorPickerRule = rule({ description: "Mi-Light color picker: forwards preset color to color slider" })
    .onChanged(toiletMilightColorPicker)
    .actionHints(toiletMilightColor)
    .run((ctx) => {
        const hue = ctx.runtime.getState(toiletMilightColorPicker) as number;
        ctx.logger.info("Color picker: hue=" + hue);
        return [
            ruleAction({ type: "setAnalogOutput", resource: toiletMilightColor, value: hue }),
        ];
    });

// When the white virtual slider changes → emit white mode signal + set CCT
export const toiletMilightWhiteRule = rule({ description: "Mi-Light white mode: enters white mode + sets CCT" })
    .onChanged(toiletMilightWhite)
    .actionHints(toiletMilightCeilingWhiteMode, toiletMilightCeilingColorTemp)
    .run((ctx) => {
        const cct = ctx.runtime.getState(toiletMilightWhite) as number;
        ctx.logger.info("White mode: cct=" + cct);
        return [
            ruleAction({ type: "emitSignal", resource: toiletMilightCeilingWhiteMode, value: true }),
            ruleAction({ type: "setAnalogOutput", resource: toiletMilightCeilingColorTemp, value: cct }),
        ];
    });
