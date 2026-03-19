import { location } from "@uhn/blueprint";
import { hallDimmerCeilingSpotlight } from "../resources/hall";

export const locationHall = location({
    name: "Hall",
    icon: "room:hallway",
    items: [
        hallDimmerCeilingSpotlight,
    ],
});
