<script lang="ts">
import StatueLocationSelector from "./StatueLocationSelector.svelte";
import StatueShapeSelector from "./StatueShapeSelector.svelte";
import ShapeSelector from "./ShapeSelector.svelte";
import RefreshButton from "../buttons/RefreshButton.svelte";
import { fade } from "svelte/transition";
import { Shape } from "../../Enums/Shape.ts";
import { StatueLocation } from "../../Enums/StatueLocation.ts";
import type { InputData } from "../../Types/InputData.ts";

import { createEventDispatcher, tick, onMount } from "svelte";

const RESET_EVENT: String = "reset";

const dispatch = createEventDispatcher();

let shapes: Shape[] = [];
let statueShape: Shape = null;
let statueLocation: StatueLocation = null;

let resetEnabled: boolean = false;
let outputVisible: boolean = false;
let inputIsValid: boolean = true;
let errorMessageVisible: boolean = false;

let outputContainer;
let inputContainer;
let container;

function defineSteps(location: StatueLocation, statueShape: Shape, shapes: Shape[]): string[] {
  let doubled: boolean = shapes[0] === shapes[1];
  const otherLocations: StatueLocation[] = getOtherLocations(location);
  const otherShapes: Shape[] = getOtherShapes(statueShape);
  const resultingShape: Shape = getResultingShape(statueShape);
  if(!doubled) {
    const value = shapes.find(s => s !== statueShape);
    return [`<b>KILL</b> a knight until it drops a <b>${value}</b>`, 
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
      `If done correctly, you should not be holding a <b>${resultingShape}</b> (${otherShapes[0]} + ${otherShapes[1]})`,
      `Once dissection outside is finished, <b>ESCAPE</b> through the crystal wall at the back of the room`
    ];
  }
} 

function validateAndUpdateOutput() {
  inputIsValid = validateInput(statueShape, shapes);
  let params = statueLocation !== null && statueShape !== null && shapes.length == 2;
  if(params && inputIsValid) {
    outputVisible = true;
    errorMessageVisible = false;
  } else if(params && !inputIsValid) {
    outputVisible = false;
    errorMessageVisible = true;
  }
}

function validateInput(statueShape: Shape, shapesHeld: Shape[]): boolean {
  let valid = shapesHeld.filter(item => item === statueShape);
  return statueShape !== null && shapesHeld.length > 0 && valid.length != 0;
}

function setLocation(event) { 
  statueLocation = event.detail;
  resetEnabled = true;
  validateAndUpdateOutput(); 
}

function setStatueShape(event) {
  statueShape = event.detail;
  resetEnabled = true;
  validateAndUpdateOutput();
}

function setShapes(event) {
  shapes = event.detail;
  resetEnabled = true;
  validateAndUpdateOutput(); 
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
      return new Error("Shape passed is not a 2D shape");
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
  inputIsValid = true;
  resetEnabled = false;
  outputVisible = false;
  errorMessageVisible = false;
  statueLocation = null;
  statueShape = null;
  shapes = [];
  dispatch(RESET_EVENT);
}

function outputTransition(node) {
  let viewportWidth = window.innerWidth;
  if(viewportWidth > 800) {
    return fly(node, {x: 50, duration: 500});
  } else {
    return fly(node, {y: -50, duration: 500});
  }
}

function scrollToOutput() {
  if(outputContainer) {
    outputContainer.scrollIntoView({ behavior: "smooth" })
  }
}

function errorMessageDescription(shapes: Shape[]): string {
  if(shapes[0] === shapes[1]) {
    return `you can never start with double ${shapes[0]}s on your wall`;
  } else {
    return `you can never start with ${getOtherShapes(statueShape)[0]} and ${getOtherShapes(statueShape)[1]} on your wall`;
  }
}

$: if(outputContainer && window.innerWidth <= 800) {
  scrollToOutput();
}
</script>

<main transition:fade bind:this={container}> 
  <div class="input-container" bind:this={inputContainer}>
    {#if errorMessageVisible}
      <div class="error-container" transition:outputTransition>
        <p class="error-message">
          The shapes you put in are wrong.
          <br />
          If your statue is holding a {statueShape} {errorMessageDescription(shapes)}</p>
      </div>
    {/if}
    <StatueLocationSelector on:statueSelect={setLocation} {resetEnabled}/>
    <StatueShapeSelector on:selectShape={setStatueShape} {resetEnabled}/>
    <ShapeSelector on:shapes={setShapes} {resetEnabled}/>
  </div>
  {#if outputVisible}
    <div class="output-container" bind:this={outputContainer} transition:outputTransition> 
      <h3 class="title">Steps:</h3>
      {#each defineSteps(statueLocation, statueShape, shapes) as step, i}
        <p class="list-item">{++i}. {@html step}</p> 
      {/each} 
    </div>
  {/if}
</main>
{#if resetEnabled}
  <RefreshButton on:click={reset}/>
{/if}

<style>
main {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  gap: 2rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

.output-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
  align-content: start;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: var(--background-color);
  margin: 0rem 3rem;
}

.error-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin: 0.25rem;
  padding: 0 .5rem;
}

.error-message {
  color: red;
  font-size: 0.83rem;
  text-align: center;
}

.title {
  align-self: center;
  color: var(--text-color);
}

.list-item {
  color: var(--text-color);
}

@media(min-width: 50em) {
  main {
    flex-direction: row;
    justify-content: center;
  }
}
</style>

