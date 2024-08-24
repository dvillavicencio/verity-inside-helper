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
  if(!doubled) {
    const key = Object.keys(shapes)
      .find(key => key !== statueShape && shapes[key]); 
    const value = key ? shapes[key] : undefined;
    return [`KILL a KNIGHT until it drops a ${value}`, 
      `DEPOSIT ${value} on the statue holding ${value}`,
      `WAIT until the other two guardians have DOUBLE SHAPES as well`,
      `KILL the leftover KNIGHT and DEPOSIT ${statueShape} on ${otherLocations[0]}`,
      `KILL the OGRE`,
      `KILL the KNIGHT until it drops a second ${statueShape}`,
      `DEPOSIT the ${statueShape} on ${otherLocations[1]}`,
      `Up in the wall you should have ONLY one ${otherShapes[0]} and one ${otherShapes[1]}`,
      `KILL KNIGHTs and OGREs and pick up both ${otherShapes[0]} and ${otherShapes[1]} at the same time`,
      `If dissection outside has been done correctly, WALK THROUGH the crystal wall on the back of the room`
    ]; 
  } else {
    return [
      `WAIT until the other two guardians have DOUBLE SHAPES as well`,
      `KILL a KNIGHT and PICK UP the ${statueShape}`,
      `DEPOSIT ${statueShape} to ${otherLocations[0]}`,
      `KILL the leftover KNIGHT and PICK UP the other ${statueShape}`,
      `DEPOSIT ${statueShape} on ${otherLocations[1]}`,
      `Up in the wall you should have ONLY one ${otherShapes[0]} and one ${otherShapes[1]}`,
      `KILL KNIGHTs and OGREs and pick up both ${otherShapes[0]} and ${otherShapes[1]} at the same time`,
      `If dissection outside has been done correctly, WALK THROUGH the crystal wall on the back of the room`
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
  <ShapeSelector on:shapes={setShapes} />
</div>
<div class="output-container">
  {#if statueLocation !== null && statueShape !== null && shapes.length == 2} 
    <h3 class="title">Steps:</h3>
    {#each defineSteps(statueLocation, statueShape, shapes) as step, i}
      <p>{++i}. {step}</p> 
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

