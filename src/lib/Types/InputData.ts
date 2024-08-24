import { Shape } from "../Enums/Shape.ts";
import { StatueLocation } from "../Enums/StatueLocation.ts";

export type InputData = {
  statueShape: Shape,
  statueLocation: StatueLocation, 
  shapesHeld: Shape[] 
};
