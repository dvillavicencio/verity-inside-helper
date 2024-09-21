<script lang="ts">
  import GenericShape from "./GenericShape.svelte";
  import { Shape } from "../../Enums/Shape.ts";
  import { createEventDispatcher } from "svelte";

  export let resetEnabled: boolean;

  let selectedShape: Shape = null;

  const dispatch = createEventDispatcher<{
    selectShape: Shape;
  }>();

  function handleClick(shape: Shape) {
    if(selectedShape === shape) {
      selectedShape = null;
    } else {
      selectedShape = shape;
      dispatch('selectShape', shape);
    }
  }

  $: if(resetEnabled === false) {
    selectedShape = null;
  }
</script>

<div class="container">
  <p>What shape is your statue holding?</p>
  <div class="shape-container">
    <GenericShape isClicked={selectedShape === Shape.Triangle} on:select={() => handleClick(Shape.Triangle)} shapeType={Shape.Triangle} />
    <GenericShape isClicked={selectedShape === Shape.Circle} on:select={() => handleClick(Shape.Circle)} shapeType={Shape.Circle} />
    <GenericShape isClicked={selectedShape === Shape.Square} on:select={() => handleClick(Shape.Square)} shapeType={Shape.Square} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 1vw;
    gap: 1vw
  }
  .shape-container {
    display: flex;
    gap: clamp(16px, 5vw, 32px);
  }
  p {
    color: var(--text-color);
    transition: color 0.3s ease;
  }
</style>
