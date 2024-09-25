import { Shape } from "../Enums/Shape";
import { StatueLocation } from "$lib/Enums/StatueLocation";

/**
 * Returns the compliment of the 2D shape passed in
 * ex: shape = Triangle will return Square and Circle
 * shape = Square will return Circle and Triangle and so on... 
 */
export function getOtherShapes(shape: Shape): Shape[] {
  switch (shape) {
    case Shape.Triangle:
      return [Shape.Circle, Shape.Square];
    case Shape.Square:
      return [Shape.Circle, Shape.Triangle];
    case Shape.Circle:
      return [Shape.Square, Shape.Triangle];
    default:
      throw new Error('Invalid shape');
  }
}

/**
 * Returns based on a given Shape what the resulting key of the player
 * should be
 *
 * ex: If the player's statue is holding a Square then the resulting shape should
 * be a Cone (Circle + Triangle)
 */
export function getResultingShape(shape: Shape): Shape {
  switch (shape) {
    case Shape.Triangle:
      return Shape.Cylinder;
    case Shape.Square:
      return Shape.Cone;
    case Shape.Circle:
      return Shape.Prism;
    default:
      throw new Error("Shape passed is not a 2D shape");
  }
}

/** Returns the other locations based on a player's current statue location
  */
export function getOtherLocations(currentLocation: StatueLocation): StatueLocation[] {
  switch (currentLocation) {
    case StatueLocation.Left:
      return [StatueLocation.Mid, StatueLocation.Right];
    case StatueLocation.Mid:
      return [StatueLocation.Left, StatueLocation.Right];
    case StatueLocation.Right:
      return [StatueLocation.Left, StatueLocation.Mid];
    default:
      throw new Error('Invalid location');
  }
}

/**
 * Returns the statue for which a player is holding a key for
 */
export function getDepositStatue(shape1: Shape, shape2: Shape): Shape {
  if (shape1 === shape2) {
    throw new Error("Shape 1 and Shape 2 cannot be the same");
  }
  if ((shape1 === Shape.Triangle && shape2 === Shape.Circle) ||
    (shape1 == Shape.Circle && shape2 === Shape.Triangle)) {
    return Shape.Square;
  } else if ((shape1 === Shape.Square && shape2 === Shape.Circle) ||
    (shape1 === Shape.Circle && shape2 === Shape.Square)) {
    return Shape.Triangle;
  } else {
    return Shape.Circle;
  }
}
