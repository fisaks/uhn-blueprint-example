import { analogDimmer } from "../factory/factory";

export const hallDimmerCeilingSpotlight = analogDimmer({
    edge: "edge1",
    device: "ihc2",
    pin: 0x8AE35D,
    defaultOnValue: 70,
    icon: "lighting:spot",
    description: "Dimmable ceiling spotlight in the hall",
    keywords: ["downlight"],
});
