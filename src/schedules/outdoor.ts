import { cron, minutes, schedule } from "@uhn/blueprint";

// Windows where the outdoor light follows the twilight sensor
export const scheduleOutdoorLighting = schedule({ name: "Outdoor Lighting" })
    .phase("eveningStart", cron.daily().at("16:00"))
    .phase("eveningEnd", cron.daily().at("21:00"))
    .phase("morningStart", cron.daily().at("06:30"))
    .phase("morningEnd", cron.daily().at("09:00"))
    .missedGrace(minutes(30));
