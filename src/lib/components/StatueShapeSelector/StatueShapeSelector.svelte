<script lang="ts">
  import Triangle from "../Shapes/Triangle.svelte";
  import Circle from "../Shapes/Circle.svelte";
  import Square from "../Shapes/Square.svelte";
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

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 1vw;
    gap: .5vw
  }
  .shape-container {
    display: flex;
    gap: 5vw;
  }
</style>

<div class="container">
  <p>What shape is your statue holding?</p>
  <div class="shape-container">
     <Triangle isClicked={selectedShape === Shape.Triangle} on:select={() => handleClick(Shape.Triangle)}/>
     <Circle isClicked={selectedShape === Shape.Circle} on:select={() => handleClick(Shape.Circle)}/>
     <Square isClicked={selectedShape === Shape.Square} on:select={() => handleClick(Shape.Square)}/>
  </div>
</div>
