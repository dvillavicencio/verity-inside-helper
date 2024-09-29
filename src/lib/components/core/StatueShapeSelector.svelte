<script lang="ts">
  import GenericShape from "./GenericShape.svelte";
  import { Shape } from "../../Enums/Shape.ts";
  import { createEventDispatcher } from "svelte";

  export let resetEnabled: boolean;

  let selectedShape: Shape = null;

  const dispatch = createEventDispatcher<{
    selectShape: Shape;
  }>();

  function selectShape(shape: Shape) {
    if(selectedShape === shape) {
      selectedShape = null;
    } else {
      selectedShape = shape;
      dispatch('selectShape', shape);
    }
  }

  const shapes = [ Shape.Triangle, Shape.Circle, Shape.Square ];

  $: if(resetEnabled === false) {
    selectedShape = null;
  }
</script>

<div class="container">
  <h3>What shape is your statue holding?</h3>
  <div class="shape-container">
    {#each shapes as shape}
      <GenericShape 
        isClicked={selectedShape === shape}
        on:click={() => selectShape(shape)}
        shapeType={shape}/>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .shape-container {
    display: flex;
    gap: clamp(1rem, 1.5rem, 2rem);
  }

  h3 {
    color: var(--text-color);
  }
</style>
