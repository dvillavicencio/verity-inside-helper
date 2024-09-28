import { Shape } from "$lib/Enums/Shape";
import { StatueLocation } from "$lib/Enums/StatueLocation";
import { DoubledPlayers } from "$lib/Enums/DoubledPlayers.js";
import * as shapeUtils from "./ShapeUtils";

export function defineFastStrategySteps(statueLocation: StatueLocation, statueShape: Shape, shapes: Shape[], playersDoubled: DoubledPlayers): string[] {
  const doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = shapeUtils.getOtherLocations(statueLocation);
  const otherShapes: Shape[] = shapeUtils.getOtherShapes(statueShape);
  if (playersDoubled === DoubledPlayers.None) {
    const depositStatueShape = shapeUtils.getDepositStatue(shapes[0], shapes[1]);
    return [
      `<b>Kill</b> a knight</b>`,
      `<b>Deposit</b> the shape on the statue holding a <b>${depositStatueShape}</b>`,
      `<b>Kill</b> another knight`,
      `<b>Deposit</b> the shape again on the statue holding a <b>${depositStatueShape}</b>`,
      `<b>Kill</b> the ogre and both knights`,
      `<b>Pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
    ];
  } else if (playersDoubled == DoubledPlayers.One) {
    const complimentShape = shapes.find(s => s !== statueShape);
    const complimentStatueShape = otherShapes.find(l => l !== complimentShape);
    return doubled ? [
      `<b>Kill</b> a knight`,
      `<b>Pick up</b> a <b>${shapes[0]}</b>`,
      `<b>Deposit</b> the <b>${shapes[0]}</b> on <b>${otherLocations[0]}</b>`,
      `<b>Kill</b> another knight`,
      `<b>Pick up</b> your other <b>${shapes[0]}</b>`,
      `<b>Deposit</b> the <b>${shapes[0]}</b> on <b>${otherLocations[1]}</b>`,
      `<b>Kill</b> the ogre and both knights`,
      `<b>Pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`] :
      [
        `<b>Kill</b> a knight`,
        `If the shape the knight dropped is a <b>${complimentShape}</b>, <b>deposit</b> the <b>${complimentShape}</b> on the statue holding a <b>${complimentStatueShape}</b>`,
        `If the shape the knight dropped is a <b>${statueShape}</b>, <b>deposit</b> the <b>${statueShape}</b> on the statue holding a <b>${complimentShape}</b>`,
        `You should now have a <b>${otherShapes[0]}</b> and a <b>${otherShapes[1]}</b> up on your wall`,
        `<b>Kill</b> the ogre and both knights`,
        `<b>Pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`]
  } else {
    return [
      `All players have doubled shapes! This means you will do the normal strategy for doubled shapes`,
      `<b>Kill</b> a knight and <b>pick up</b> a <b>${statueShape}</b>`,
      `<b>Deposit</b> <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `<b>Kill</b> another knight until it drops a <b>${statueShape}</b>`,
      `<b>Deposit</b> <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `<b>Kill</b> the ogre and both knights and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
    ]
  }
}

export function defineNormalSteps(location: StatueLocation, statueShape: Shape, shapes: Shape[]): string[] {
  let doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = shapeUtils.getOtherLocations(location);
  const otherShapes: Shape[] = shapeUtils.getOtherShapes(statueShape);
  if (!doubled) {
    const value = shapes.find(s => s !== statueShape);
    return [
      `<b>Kill</b> a knight until it drops a <b>${value}</b>`,
      `<b>Deposit</b> the <b>${value}</b> on the statue holding a <b>${value}</b>`,
      `<b>Wait</b> until the other two guardians have double shapes as well`,
      `<b>Kill</b> another knight`,
      `<b>Deposit</b> the <b>${statueShape}</b> on the <b>${otherLocations[0]}</b> statue`,
      `<b>Kill</b> an ogre if there is one`,
      `<b>Kill</b> a knight until it drops another <b>${statueShape}</b>`,
      `<b>Deposit</b> the <b>${statueShape}</b> on the <b>${otherLocations[1]}</b> statue`,
      `<b>Kill</b> knights and ogres`,
      `<b>Pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
    ];
  } else {
    return [
      `<b>Wait</b> until the other two guardians have double shapes`,
      `<b>Kill</b> a knight and <b>pick up</b> a <b>${statueShape}</b>`,
      `<b>Deposit</b> <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `<b>Kill</b> another knight until it drops a <b>${statueShape}</b>`,
      `<b>Deposit</b> <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `<b>Kill</b> knights and ogres`,
      `<b>Pick up<b> both ${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
    ];
  }
}
