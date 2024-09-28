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

  $: if(resetEnabled === false) {
    selectedShape = null;
  }
</script>

<div class="container">
  <h3>What shape is your statue holding?</h3>
  <div class="shape-container">
    <GenericShape id="statueShapeTriangle" isClicked={selectedShape === Shape.Triangle} on:select={() => selectShape(Shape.Triangle)} shapeType={Shape.Triangle} />
    <GenericShape id="statueShapeCircle" isClicked={selectedShape === Shape.Circle} on:select={() => selectShape(Shape.Circle)} shapeType={Shape.Circle} />
    <GenericShape id="statueShapeSquare" isClicked={selectedShape === Shape.Square} on:select={() => selectShape(Shape.Square)} shapeType={Shape.Square} />
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
