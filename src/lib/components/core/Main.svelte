<script lang="ts">
import StatueLocationSelector from "./StatueLocationSelector.svelte";
import StatueShapeSelector from "./StatueShapeSelector.svelte";
import ShapeSelector from "./ShapeSelector.svelte";
import RefreshButton from "../buttons/RefreshButton.svelte";
import PlayersDoubleShapesSelector from "./PlayersDoubleShapesSelector.svelte";
import { fly } from "svelte/transition";
import { Shape } from "../../Enums/Shape.ts";
import { StatueLocation } from "../../Enums/StatueLocation.ts";
import { DoubledPlayers } from "../../Enums/DoubledPlayers.ts";
import { toggleStore } from "../stores/ToggleStore.ts";
import { createEventDispatcher } from "svelte";
import * as shapeUtils from "../../utils/ShapeUtils.ts";
import * as solutions from "../../utils/SolutionUtils.ts";

const RESET_EVENT: String = "reset";

const dispatch = createEventDispatcher();

let shapes: Shape[] = [];
let statueShape: Shape = null;
let statueLocation: StatueLocation = null;
let playersDoubled: DoubledPlayers = null;

let resetEnabled: boolean = false;
let outputVisible: boolean = false;
let validShapes: boolean = true;
let errorMessageVisible: boolean = false;
let fastStrategy: boolean = false;

let outputContainer;
let inputContainer;
let container;
let homePage;

$: toggleStore.subscribe(value => fastStrategy = value);

function validateAndUpdateOutput() {
  if(fastStrategy) {
    validShapes = validateShapes(statueShape, shapes);
    let params = statueLocation !== null && statueShape !== null && playersDoubled !== null && shapes.length == 2;
    if(params && validShapes) {
      outputVisible = true;
      errorMessageVisible = false;
    } else if(params && !validShapes) {
      outputVisible = false;
      errorMessageVisible = true;
    }
  } else {
    validShapes = validateShapes(statueShape, shapes);
    let params = statueLocation !== null && statueShape !== null && shapes.length == 2;
    if(params && validShapes) {
      outputVisible = true;
      errorMessageVisible = false;
    } else if(params && !validShapes) {
      outputVisible = false;
      errorMessageVisible = true;
    }
  }
  
}

function validateShapes(statueShape: Shape, shapesHeld: Shape[]): boolean {
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

function setPlayersDoubledShapes(event) {
  playersDoubled = event.detail; 
  resetEnabled = true;
  validateAndUpdateOutput();
}

function reset() {
  validShapes = true;
  resetEnabled = false;
  outputVisible = false;
  errorMessageVisible = false;
  statueLocation = null;
  statueShape = null;
  playersDoubled = null;

  shapes = [];
  dispatch(RESET_EVENT);
}

function outputTransition(node) {
  return fly(node, {y: -50, duration: 500});
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
    return `you can never start with ${shapeUtils.getOtherShapes(statueShape)[0]} and ${shapeUtils.getOtherShapes(statueShape)[1]} on your wall`;
  }
}

$: if(outputContainer && window.innerWidth <= 800) {
  scrollToOutput();
}
</script>

<main bind:this={container}> 
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
    {#if fastStrategy}
      <PlayersDoubleShapesSelector on:doubledPlayers={setPlayersDoubledShapes} {resetEnabled}/>
    {/if}
  </div>
  {#if outputVisible}
    <div class="output-container" bind:this={outputContainer} transition:fly={{y: -50, duration: 500}}> 
      <h3 class="title">Steps for {fastStrategy ? "Fast Strategy" : "Normal/LFG Strategy"}</h3>
      <ul>
        {#if fastStrategy}
          {#each solutions.defineFastStrategySteps(statueLocation, statueShape, shapes, playersDoubled) as step, i}
            {#if i == 0}
              <p class="list-item">{@html step}</p>
            {:else}
              <li class="list-item">{@html step}</li>
            {/if}
          {/each}
        {:else}
          {#each solutions.defineNormalSteps(statueLocation, statueShape, shapes) as step, i}
            <li class="list-item">{@html step}</li>
          {/each} 
        {/if}
      </ul>
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
  align-items: center;
  background-color: var(--background-color);
  gap: 2rem;
}

li {
  margin: 1rem 0;
}

ul {
  margin: 0;
  max-width: 20rem;
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
  gap: 0.25rem;
  align-items: start;
  align-content: start;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 32rem;
  background-color: var(--background-color);
  padding: 0 1.25rem;
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

@media(min-width: 48em) {
  main {
    flex-direction: row;
    align-items: start;
    justify-content: center;
  }
}
</style>

