<script lang="ts">
  import { Shape } from "../../Enums/Shape.ts";
  import { createEventDispatcher } from "svelte";

  export let isClicked: boolean = false;
  export let shapeType;

  const dispatch = createEventDispatcher();

  function handleClick() {
    isClicked = !isClicked;
    dispatch('select')
  }
</script>

<div class="shape-container" on:click={handleClick}>
  {#if shapeType === Shape.Triangle}
    <svg  class:selected={isClicked} width="90px" height="90px" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <title>equilateral triangle</title>
      <path d="M 45 2 L 88 88 L 2 88 Z"/>
    </svg>
  {:else if shapeType === Shape.Circle}
    <svg fill="none" class:selected={isClicked} width="90px" height="90px" viewBox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>circle</title>
      <circle cx="45" cy="45" r="43"></circle>
    </svg>
  {:else}
    <svg class:selected={isClicked}  width="90px" height="90px" viewBox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>square</title>
      <rect x="3" y="3" width="84" height="84"></rect>
    </svg> 
  {/if}
</div>

<style>
svg {
  stroke: var(--outline-color);
  stroke-width: 3;
  fill: transparent;
  transition: stroke 0.1s ease, fill 0.1s ease;
}

svg:active {
  stroke: var(--hover-stroke-color);
  fill: var(--hover-background-color);
}

.shape-container {
  display: flex;
}

.selected {
  stroke: var(--selected-color);
}

@media(min-width: 50rem) {
  svg:hover {
    stroke: var(--hover-stroke-color);
    fill: var(--hover-background-color);
  }
}
</style>
