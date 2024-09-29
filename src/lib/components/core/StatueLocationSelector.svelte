<script lang="ts">
  import { StatueLocation } from "../../Enums/StatueLocation.ts";
  import { ArrowLeft, ArrowRight, Dot } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";

  const DISPATCH_EVENT_NAME: String = "statueSelect"; 

  export let resetEnabled: boolean;
  
  let selectedLocation: StatueLocation = null;

  const dispatch = createEventDispatcher<{
    DISPATCH_EVENT_NAME: StatueLocation;
  }>();
  
  function selectStatue(selected: StatueLocation) {
    selectedLocation = selectedLocation === selected ? null : selected;
    dispatch(DISPATCH_EVENT_NAME, selectedLocation);
  }

  $: if(resetEnabled === false) {
    selectedLocation = null;
  };

  const sides = [
    {
      value: StatueLocation.Left,
      label: 'Left',
      icon: ArrowLeft
    },
    {
      value: StatueLocation.Mid,
      label: 'Mid',
      icon: Dot
    },
    {
      value: StatueLocation.Right,
      label: 'Right',
      icon: ArrowRight
    }
  ] 
</script>

<div class="container">
  <h3>Where is your statue?</h3>
  <div class="side-options">
    {#each sides as side}
        <div class="card" 
          aria-label={`Select ${side.value}`}
          class:selected={selectedLocation === side.value}
          on:click={() => selectStatue(side.value)}> 
          <svelte:component this={side.icon} />
          <span>{side.label}</span>
        </div>
      {/each}
  </div>
</div>

<style>
.container {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
}

.side-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(1rem, 1.5rem, 2rem);
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

h3 {
  color: var(--text-color);
}

@media(hover: hover) and (pointer: fine) {
  .card:hover {
    background-color: var(--hover-background-color);
  }
}
</style>

