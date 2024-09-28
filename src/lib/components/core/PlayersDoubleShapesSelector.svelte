<script lang="ts">
import { DoubledPlayers } from "../../Enums/DoubledPlayers.ts";
import { Users, User, UserRoundX } from "lucide-svelte";
import { Shape } from "../../Enums/Shape.ts";
import { createEventDispatcher } from "svelte";

const DISPATCH_EVENT_NAME: String = "doubledPlayers";

export let resetEnabled: boolean;
export let shapes: Shape[] = [];

let selectedConfiguration: DoubledPlayers = null;

const dispatch = createEventDispatcher<{
  DISPATCH_EVENT_NAME: DoubledPlayers;
}>();

const options = [
  { value: DoubledPlayers.None, label: 'None', icon: UserRoundX, disabled: false },
  { value: DoubledPlayers.One, label: 'One', icon: User, disabled: false },
  { value: DoubledPlayers.All, label: 'All', icon: Users, disabled: false }
];

function optionDisabled(option: DoubledPlayers) {
  return options.find(o => o.value === option).disabled;
}

function selectOption(option: DoubledPlayers) {
  selectedConfiguration = selectedConfiguration === option && !optionDisabled(option) ? null : option;
  dispatch(DISPATCH_EVENT_NAME, selectedConfiguration);
}

$: if(resetEnabled == false) {
  selectedConfiguration = null;
}

$: if(shapes.length == 2) {
  if(shapes[0] === shapes[1]) {
    options.map(option => {
      if(option.value === DoubledPlayers.None) {
        option.disabled = !option.disabled;
      }
    });
  } else {
    options.map(option => {
      if(option.value === DoubledPlayers.All) {
        option.disabled = !option.disabled;
      }
    })
  }
}
</script>

<div class="container">
  <h3>How many guardians are doubled?</h3>
  <div class="options-container">
    {#each options as option}
      <label
        for={option.label}
        class:disabled={option.disabled}
        class:selected={selectedConfiguration == option.value &&
          !optionDisabled(option.value)}
        on:click={() => selectOption(option.value)}>
        <svelte:component this={option.icon} />
        <span>{option.label}</span>
      </label>
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

.options-container {
  display: flex;
  flex-direction: row;
  gap: clamp(1rem, 1.5rem, 2rem);
  align-items: center;
  justify-items: center;
}

.disabled {
  background-color: var(--disabled-background-color);
  cursor: not-allowed;
  opacity: 0.4;
}

.selected {
  border-color: var(--selected-color);
}

h3 {
  color: var(--text-color);
}

fieldset {
  border: transparent;
}

label { 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 6rem;
  height: 6rem;
  border: 2px solid var(--outline-color);
  border-radius: 0.5rem;
  color: var(--text-color);
  cursor: pointer;
}

p {
  color: var(--text-color);
}

@media(hover: hover) and (pointer: fine) {
  label:hover:not(.disabled) {
    background-color: var(--hover-background-color);
  }
}
</style>
