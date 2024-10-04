import { Shape } from "$lib/Enums/Shape";
import type { Solution } from "../types/Solution";
import { StatueLocation } from "$lib/Enums/StatueLocation";
import { DoubledPlayers } from "$lib/Enums/DoubledPlayers.js";
import * as shapeUtils from "./ShapeUtils";

export function fastStrategy(statueLocation: StatueLocation, statueShape: Shape, shapes: Shape[], playersDoubled: DoubledPlayers): Solution {
  const doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = shapeUtils.getOtherLocations(statueLocation);
  const otherShapes: Shape[] = shapeUtils.getOtherShapes(statueShape);
  if (playersDoubled === DoubledPlayers.None) {
    const depositStatueShape = shapeUtils.getDepositStatue(shapes[0], shapes[1]);
    return {
      title: `You are holding <b>${depositStatueShape}'s</b> key`,
      description: "Since no players are doubled this means <b>you're holding another player's key</b>." +
        `In this specific case, you're holding <b>${depositStatueShape}'s</b> key.` + " You'll deposit both of your starting shapes on their statue",
      steps: [
        `<b>Kill</b> knights and <b>deposit</b> both your <b>${shapes[0]}</b> and <b>${shapes[1]}</b> on the statue holding a <b>${depositStatueShape}</b> (one by one)`,
        `<b>Kill</b> an ogre and both knights and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`]
    };
  } else if (playersDoubled == DoubledPlayers.One) {
    const complimentShape = shapes.find(s => s !== statueShape);
    const complimentStatueShape = otherShapes.find(l => l !== complimentShape);
    return doubled ? {
      title: `You are the only person with double shapes`,
      description: "Someone has doubled shapes and that's <b>you</b>! This makes it simpler for you." +
        `You'll just be passing both of your <b>${statueShape}s</b> to of your teammates normally.`,
      steps: [
        `<b>Kill</b> knights, <b>pick up</b> each of your <b>${statueShape}s</b> and <b>deposit</b> one on <b>${otherLocations[0]}</b> and another on <b>${otherLocations[1]}</b>`,
        `<b>Kill</b> the ogre and both knights, and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`]
    } :
      {
        title: `Two players are not doubled`,
        description: "Two players do not have double shapes and one of them is <b>you</b>. In this case you need to be mindful where you deposit each shape you have on your wall." +
          `The key thing to note here is that the ${complimentShape} needs to be deposited in ${complimentStatueShape}, since the statue holding ${complimentShape} does not need it`,
        steps: [
          `<b>Kill</b> a knight`,
          `If the shape the knight dropped is a <b>${complimentShape}</b>, <b>deposit</b> the <b>${complimentShape}</b> on the statue holding a <b>${complimentStatueShape}</b>`,
          `If the shape the knight dropped is a <b>${statueShape}</b>, <b>deposit</b> the <b>${statueShape}</b> on the statue holding a <b>${complimentShape}</b>`,
          `<b>Kill</b> the ogre and both knights and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
          `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
        ]
      }

  } else {
    return {
      title: "All Players are Doubled!",
      description: "All players have doubled shapes! This means that you'll do just do the normal strategy for doubled shapes",
      steps: [
        `<b>Kill</b> knights and deposit both of your ${shapes[0]} on <b>${otherLocations[0]}</b> and <b>${otherLocations[1]}</b> (one by one)`,
        `<b>Kill</b> an ogre and both knights and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
      ]
    }
  }
}

export function normalStrategy(location: StatueLocation, statueShape: Shape, shapes: Shape[]): Solution {
  let doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = shapeUtils.getOtherLocations(location);
  const otherShapes: Shape[] = shapeUtils.getOtherShapes(statueShape);
  if (!doubled) {
    const value = shapes.find(s => s !== statueShape);
    return {
      title: "Normal/LFG Strategy",
      description: "The normal strategy is as simple as three steps: double up, distribute, pick up and get out.",
      steps: [
        `<b>Kill</b> a knight until it drops a <b>${value}</b> and <b>deposit</b> it on the statue holding a <b>${value}</b>`,
        `Once you have only two ${statueShape}s on your wall, <b>kill</b> knights, <b>pick up</b> each <b>${statueShape}</b> and deposit them both on <b>${otherLocations[0]}</b> and <b>${otherLocations[1]}</b> (one at a time)`,
        `<b>Kill</b> knights and ogres and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
      ]
    };
  } else {
    return {
      title: "Normal/LFG Strategy but you skip one step!",
      description: `Since you have double shapes on your wall you skip the normal doubling phase. 
      You just need to distribute your <b>${statueShape}s</b> to <b>${otherLocations[0]}</b> and <b>${otherLocations[1]}</b>`,
      steps: [
        `<b>Kill</b> knights, <b>pick up</b> each <b>${statueShape}</b> and deposit them both on ${otherLocations[0]} and ${otherLocations[1]} (one at a time)`,
        `<b>Kill</b> knights and ogres and <b>pick up</b> both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
        `Once dissection outside is finished, <b>escape</b> through the crystal wall at the back of the room`
      ]
    };
  }
}
