<script lang="ts">
import StatueLocationSelector from "./StatueLocationSelector.svelte";
import StatueShapeSelector from "./StatueShapeSelector.svelte";
import ShapeSelector from "./ShapeSelector.svelte";
import RefreshButton from "../buttons/RefreshButton.svelte";
import PlayersDoubleShapesSelector from "./PlayersDoubleShapesSelector.svelte";
import FloatingNotification from "./FloatingNotification.svelte";
import ChecklistStepGuide from "./ChecklistStepGuide.svelte";
import { fly } from "svelte/transition";
import { onMount, createEventDispatcher } from "svelte";
import { Shape } from "../../Enums/Shape.ts";
import { StatueLocation } from "../../Enums/StatueLocation.ts";
import { DoubledPlayers } from "../../Enums/DoubledPlayers.ts";
import { strategyModeStore } from "../stores/StrategyModeStore.ts";
import * as shapeUtils from "../../utils/ShapeUtils.ts";
import * as solutions from "../../utils/SolutionUtils.ts";

const RESET_EVENT: String = "reset";

const dispatch = createEventDispatcher();

let shapes: Shape[] = [];
let statueShape: Shape = null;
let statueLocation: StatueLocation = null;
let playersDoubled: DoubledPlayers = null;

let currentStep = 0;
let completedSteps = 0;
let totalSteps = 0;

let resetEnabled: boolean = false;
let outputVisible: boolean = false;
let validShapes: boolean = true;
let inputErrorPresent: boolean = false;
let errorMessageVisible: boolean = false;
let fastStrategy: boolean = false;

let outputContainer: HTMLElement;
let inputContainer: HTMLElement;
let container;

let inputElements: HTMLElement[] = [];

function scrollToStep(step: number) {
  if(inputElements[step] && inputElements[step].scrollIntoView) {
    inputElements[step].scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
}

function validateShapes(statueShape: Shape, shapesHeld: Shape[]): boolean {
  let valid = shapesHeld.filter(item => item === statueShape);
  return statueShape !== null && shapesHeld.length > 0 && valid.length != 0;
}

function reset() {
  validShapes = true;
  resetEnabled = false;
  outputVisible = false;
  statueLocation = null;
  statueShape = null;
  playersDoubled = null;
  currentStep = 0;
  inputElements = [];

  shapes = [];
  dispatch(RESET_EVENT);
}

function scrollToOutput() {
  if(outputContainer) {
    outputContainer.scrollIntoView({ behavior: "smooth" })
  }
}

function errorMessageDescription(shapes: Shape[]): string {
  if(shapes[0] === shapes[1]) {
    return `If your statue is holding a ${statueShape}, you can never start with double ${shapes[0]}s on your wall`;
  } else {
    return `If your statue is holding a ${statueShape}, you can never start with ${shapeUtils.getOtherShapes(statueShape)[0]} and ${shapeUtils.getOtherShapes(statueShape)[1]} on your wall`;
  }
}

function closeErrorMessage() {
  errorMessageVisible = false;
}

$: strategyModeStore.subscribe(value => {
  fastStrategy = value;
});

$: if(currentStep > 0 && currentStep < inputElements.length) {
  scrollToStep(currentStep);
}

$: if(outputContainer) {
  scrollToOutput();
}

$: if(currentStep >= 1) {
  resetEnabled = true;
}

$: normalModeParams = statueLocation && statueShape && shapes && shapes.length == 2 && validateShapes(statueShape, shapes);
$: fastModeParams = normalModeParams && playersDoubled;

$: if(fastStrategy) {
  outputVisible = fastModeParams && currentStep >= 4;
} else {
  outputVisible = normalModeParams  && currentStep >= 3;
}

$: inputErrorPresent = statueShape && shapes.length == 2 && !validateShapes(statueShape, shapes);

$: errorMessageVisible = statueShape && shapes.length  && !validateShapes(statueShape, shapes);
</script>

<main>
  <div class="input-container">
    {#if currentStep >= 0}
      <div transition:fly={{y: 50, duration: 300}} bind:this={inputElements[0]}>
        <StatueLocationSelector on:statueSelect={event => {
          statueLocation = event.detail;
          currentStep = 1;
        }}
        {resetEnabled}/>
      </div>
    {/if}

    {#if currentStep >= 1}
      <div transition:fly={{y: 50, duration: 300}} bind:this={inputElements[1]}>
        <StatueShapeSelector on:selectShape={event => {
          statueShape = event.detail;
          currentStep = 2;
        }}
        {resetEnabled}/>
      </div> 
    {/if}

    {#if currentStep >= 2}
      <div transition:fly={{y: 50, duration: 300}} bind:this={inputElements[2]}>
        <ShapeSelector on:shapes={event => {
          shapes = event.detail;
          currentStep = fastStrategy ? 3 : 4;
        }} 
        {resetEnabled}/>
      </div>
    {/if}
    {#if fastStrategy && currentStep >= 3 && !inputErrorPresent}
      <div transition:fly={{y: 50, duration: 300}} bind:this={inputElements[3]}>
        <PlayersDoubleShapesSelector on:doubledPlayers={event => { 
          playersDoubled = event.detail;
          currentStep = 4; 
        }}
        shapes={shapes}
        {resetEnabled}/>
      </div>
    {/if}
 </div>
  {#if outputVisible}
    <div class="output-container" bind:this={outputContainer} transition:fly={{y: -50, duration: 500}}> 
      <ChecklistStepGuide 
        steps={fastStrategy ?
          solutions.defineFastStrategySteps(statueLocation, statueShape, shapes, playersDoubled) :
          solutions.defineNormalSteps(statueLocation, statueShape, shapes)}
        strategy={fastStrategy ? "Fast Strategy" : "Normal/LFG Strategy"}
        on:progress={(e) => {
          completedSteps = e.detail.completed;
          totalSteps = e.detail.total;
        }}
      />
    </div>
  {/if}
</main>
{#if resetEnabled}
  <RefreshButton onReset={reset}/>
{/if}
<FloatingNotification 
  message={errorMessageDescription(shapes)}
  visible={errorMessageVisible}
  onClose={closeErrorMessage}
/>
<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background-color);
  gap: 0.5rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
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
</style>

