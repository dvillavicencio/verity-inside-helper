<script lang="ts">
import StatueLocationSelector from "../StatueLocationSelector/StatueLocationSelector.svelte";
import StatueShapeSelector from "../StatueShapeSelector/StatueShapeSelector.svelte";
import ShapeSelector from "../ShapeSelector/ShapeSelector.svelte";

import { Shape } from "../../Enums/Shape.ts";
import { StatueLocation } from "../../Enums/StatueLocation.ts";
import type { InputData } from "../../Types/InputData.ts";

let shapes: Shape[] = [];
let statueShape: Shape = null;
let statueLocation: StatueLocation = null;

let resetEnabled: boolean = false;

function defineSteps(location: StatueLocation, statueShape: Shape, shapes: Shape[]): string[] { 
  let doubled: boolean = shapes[0] === shapes[1];

  const otherLocations: StatueLocation[] = getOtherLocations(location);
  const otherShapes: Shape[] = getOtherShapes(statueShape);
  const resultingShape: Shape = getResultingShape(statueShape);
  if(!doubled) {
    const key = Object.keys(shapes)
      .find(key => key !== statueShape && shapes[key]); 
    const value = key ? shapes[key] : undefined;
    return [`KILL a knight until it drops a <b>${value}</b>`, 
      `DEPOSIT the <b>${value}</b> on the statue holding a <b>${value}</b>`,
      `WAIT until the other two guardians have double shapes as well`,
      `KILL another knight and DEPOSIT the <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `KILL an ogre if there is one`,
      `KILL a knight until it drops a second <b>${statueShape}</b>`,
      `DEPOSIT the <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `Up in the wall you should have ONLY one <b>${otherShapes[0]}</b> and one <b>${otherShapes[1]}</b>`,
      `KILL knights and ogres and pick up both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b>`,
      `If done correctly, you should now be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystal wall at the back of the room`
    ]; 
  } else {
    return [
      `<b>WAIT</b> until the other two guardians have double shapes`,
      `KILL a knight and PICK a <b>${statueShape}</b>`,
      `DEPOSIT <b>${statueShape}</b> on <b>${otherLocations[0]}</b>`,
      `KILL another knight until it drops a <b>${statueShape}</b>`,
      `DEPOSIT <b>${statueShape}</b> on <b>${otherLocations[1]}</b>`,
      `Up in the wall you should have ONLY one <b>${otherShapes[0]}</b> and one <b>${otherShapes[1]}</b>`,
      `KILL knights and ogres and pick up both <b>${otherShapes[0]}</b> and <b>${otherShapes[1]}</b> at the same time`,
      `If done correctly, you should not be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystal wall at the back of the room`
    ];
  }
} 

function setLocation(event) { 
  statueLocation = event.detail;
  resetEnabled = true;
}

function setStatueShape(event) {
  statueShape = event.detail;
  resetEnabled = true;
}

function setShapes(event) {
  shapes = event.detail;
  resetEnabled = true;
}

function getOtherShapes(shape: Shape): Shape[]{
    switch(shape) {
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

function getResultingShape(shape: StatueShape): Shape {
  switch(shape) {
    case Shape.Triangle:
      return Shape.Cylinder;
    case Shape.Square:
      return Shape.Cone;
    case Shape.Circle:
      return Shape.Prism;
    default:
      return new Error("Shape passed in is not a 2D shape");
  }
}

function getOtherLocations(currentLocation: StatueLocation): StatueLocation[] {
  switch(currentLocation) {
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

function reset() {
  resetEnabled = false;
  statueLocation = null;
  statueShape = null;
  shapes = [];
}
</script>

<div class="input-container">
  <StatueLocationSelector on:statueSelect={setLocation} {resetEnabled}/>
  <StatueShapeSelector on:selectShape={setStatueShape} {resetEnabled}/>
  <ShapeSelector on:shapes={setShapes} {resetEnabled}/>
</div>
<div class="output-container">
  {#if statueLocation !== null && statueShape !== null && shapes.length == 2} 
    <h3 class="title">Steps:</h3>
    {#each defineSteps(statueLocation, statueShape, shapes) as step, i}
      <p>{++i}. {@html step}</p> 
    {/each}
  {/if}
</div>
{#if resetEnabled}
  <button class="reset" on:click={reset}>reset</button>
{/if}

<style>
.input-container {
  display: flex; flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vw;
}

.output-container {
  display: flex;
  flex-direction: column;
  gap: .5vw;
  align-items: start;
  align-content: start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 5vw; 
}

.title {
  align-self: center;
}

.reset {
  position: fixed;
  bottom: 3vw;
  right: 3vw;
}
</style>

