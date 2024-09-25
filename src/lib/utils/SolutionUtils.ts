import { Shape } from "$lib/Enums/Shape";
import { StatueLocation } from "$lib/Enums/StatueLocation";
import { DoubledPlayers } from "$lib/Enums/DoubledPlayers.js";
import * as shapeUtils from "./ShapeUtils";

export function defineFastStrategySteps(statueLocation: StatueLocation, statueShape: Shape, shapes: Shape[], playersDoubled: DoubledPlayers): string[] {
  const doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = shapeUtils.getOtherLocations(statueLocation);
  const otherShapes: Shape[] = shapeUtils.getOtherShapes(statueShape);
  const resultingShape: Shape = shapeUtils.getResultingShape(statueShape);
  if (playersDoubled === DoubledPlayers.None) {
    const depositStatueShape = shapeUtils.getDepositStatue(shapes[0], shapes[1]);
    return [
      `Since no players have doubled shapes this means everyone is holding someone else's key, you are holding <b>${depositStatueShape}</b>'s key`,
      `<b>KILL</b> a knight</b>`,
      `<b>DEPOSIT</b> the shape on the statue holding a <b>${depositStatueShape}</b>`,
      `<b>KILL</b> the other knight`,
      `<b>DEPOSIT</b> the shape again on the statue holding a <b>${depositStatueShape}</b>`,
      `If all players did the strategy correctly, you should now have a <b>${otherShapes[0]}</b> and a <b>${otherShapes[0]}</b> up on your wall`,
      `<b>KILL</b> the ogre and both knights and <b>PICK</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `If done correctly you should now be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystall wall at the back of the room`
    ];
  } else if (playersDoubled == DoubledPlayers.One) {
    const complimentShape = shapes.find(s => s !== statueShape);
    const complimentStatueShape = otherShapes.find(l => l !== complimentShape);
    return doubled ? [
      `There's only one player with doubled shapes and thats <b>you!</b> You just follow the normal strategy when everyone is doubled`,
      `<b>KILL</b> a knight and <b>PICK</b> a <b>${shapes[0]}</b>`,
      `<b>DEPOSIT</b> the <b>${shapes[0]}</b> on <b>${otherLocations[0]}</b>`,
      `<b>KILL</b> your other knight and <b>PICK</b> your other <b>${shapes[0]}</b>`,
      `<b>DEPOSIT</b> the <b>${shapes[0]}</b> on <b>${otherLocations[1]}</b>`,
      `If all players did the strategy correctly, you should now have a <b>${otherShapes[0]}</b> and a <b>${otherShapes[1]}</b> up on your wall`,
      `<b>KILL</b> the ogres and both knights and pick up both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `If done correctly you should now be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystall wall at the back of the room`] :
      [`There's only one player with doubled shapes, you however do not have matching shapes`,
        `<b>KILL</b> a knight`,
        `If the shape the knight dropped is a <b>${complimentShape}</b>, <b>DEPOSIT</b> the <b>${complimentShape}</b> on the statue holding a <b>${complimentStatueShape}</b>`,
        `If the shape the knight dropped is a <b>${statueShape}</b>, <b>DEPOSIT</b> the <b>${statueShape}</b> on the statue holding a <b>${complimentShape}</b>`,
        `If all players did the strategy correctly, you should now have a <b>${otherShapes[0]}</b> and a <b>${otherShapes[1]}</b> up on your wall`,
        `<b>KILL</b> the ogre and both knights and <b>PICK</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `If done correctly you should now be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
        `Once dissection outside is finished, <b>ESCAPE</b> through the crystall wall at the back of the room`]
  } else {
    return [
      `All players have doubled shapes! This means you will do the normal strategy for doubled shapes`,
      `<b>KILL</b> a knight and <b>PICK</b> a <b>${statueShape}</b>`,
      `<b>DEPOSIT</b> <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `<b>KILL</b> another knight until it drops a <b>${statueShape}</b>`,
      `<b>DEPOSIT</b> <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `Up in the wall you should have ONLY one <b>${otherShapes[0]}</b> and one <b>${otherShapes[1]}</b>`,
      `<b>KILL</b> the ogre and both knights and <b>PICK</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `If done correctly, you should  be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystal wall at the back of the room`
    ]
  }
}

export function defineNormalSteps(location: StatueLocation, statueShape: Shape, shapes: Shape[]): string[] {
  let doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = shapeUtils.getOtherLocations(location);
  const otherShapes: Shape[] = shapeUtils.getOtherShapes(statueShape);
  const resultingShape: Shape = shapeUtils.getResultingShape(statueShape);
  if (!doubled) {
    const value = shapes.find(s => s !== statueShape);
    return [
      `<b>KILL</b> a knight until it drops a <b>${value}</b>`,
      `<b>DEPOSIT</b> the <b>${value}</b> on the statue holding a <b>${value}</b>`,
      `<b>WAIT</b> until the other two guardians have double shapes as well`,
      `<b>KILL</b> another knight and <b>DEPOSIT</b> the <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `<b>KILL</b> an ogre if there is one`,
      `<b>KILL</b> a knight until it drops a second <b>${statueShape}</b>`,
      `<b>DEPOSIT</b> the <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `Up in the wall you should have <b>ONLY</b> one <b>${otherShapes[0]}</b> and one <b>${otherShapes[1]}</b>`,
      `<b>KILL</b> knights and ogres and pick up both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `If done correctly, you should now be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystal wall at the back of the room`
    ];
  } else {
    return [
      `<b>WAIT</b> until the other two guardians have double shapes`,
      `<b>KILL</b> a knight and <b>PICK</b> a <b>${statueShape}</b>`,
      `<b>DEPOSIT</b> <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `<b>KILL</b> another knight until it drops a <b>${statueShape}</b>`,
      `<b>DEPOSIT</b> <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `Up in the wall you should have ONLY one <b>${otherShapes[0]}</b> and one <b>${otherShapes[1]}</b>`,
      `<b>KILL</b> knights and ogres and pick up both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b> at the same time`,
      `If done correctly, you should  be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystal wall at the back of the room`
    ];
  }
}
