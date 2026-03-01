import { analogDimmer } from "../factory/factory";

export const bathroomDimmerCeiling = analogDimmer({
    edge: "edge1",
    device: "bathroom_dimmer_1",
    pin: 0,
    description: "Dimmable ceiling light in the bathroom",
});
