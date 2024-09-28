<script lang="ts">
  import { Shape } from "../../Enums/Shape.ts";
  import { Circle, Square, Triangle } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";

  export let isClicked: boolean = false;
  export let shapeType: Shape = null;
  export let id;

  const dispatch = createEventDispatcher();

  function handleClick() {
    isClicked = !isClicked;
    dispatch('select')
  }

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

<div class="shape-option" on:click={handleClick}>
  <input
    type="radio"
    id={id}
    value={shapes[shapeType].value}
  />
  <label
    for={id}
    class:selected={isClicked}
    on:click={handleClick}>
    <svelte:component this={shapes[shapeType].icon} />
    <span>{shapes[shapeType].label}</span>
  </label> 
</div>

<style>
  .shape-option {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  label {
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

  label :global(svg) {
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
    label:hover {
      background-color: var(--hover-background-color);
    }
  }
</style>
