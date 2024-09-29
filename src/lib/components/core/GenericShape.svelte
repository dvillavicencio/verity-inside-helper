<script lang="ts">
  import { Shape } from "../../Enums/Shape.ts";
  import { Circle, Square, Triangle } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";

  export let isClicked: boolean = false;
  export let shapeType: Shape;

  const shapes = {
    [Shape.Square]: {
      value: 'square',
      label: 'Square',
      icon: Square
    },
    [Shape.Triangle]: {
      value: 'triangle',
      label: 'Triangle',
      icon: Triangle
    },
    [Shape.Circle]: {
      value: 'circle',
      label: 'Circle',
      icon: Circle
    }
  }
</script>

<div class="shape-option" aria-label="Shape options">
    <div class="card"
      aria-label={`${shapes[shapeType].label}`}
      class:selected={isClicked}
      on:click>
    <svelte:component this={shapes[shapeType].icon} />
    <span>{shapes[shapeType].label}</span>
  </div> 
</div>

<style>
  .shape-option {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 6rem;
    height: 6rem;
    border: 2px solid var(--outline-color);
    border-radius: 0.5rem;
    background-color: var(--background-color);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .selected {
    border-color: var(--selected-color);
  }

  .card :global(svg) {
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.5rem;
    stroke: var(--outline-color);
  }

  span {
    font-size: 1rem;
    color: var(--text-color);
  }

  @media(hover: hover) and (pointer: fine) {
    .card:hover {
      background-color: var(--hover-background-color);
    }
  }
</style>
