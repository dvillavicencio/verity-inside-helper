<script lang="ts">
import { DoubledPlayers } from "../../Enums/DoubledPlayers.ts";
import { createEventDispatcher } from "svelte";
import { fly } from "svelte/transition";

const DISPATCH_EVENT_NAME: String = "doubledPlayers";

export let resetEnabled: boolean;

let selectedConfiguration: DoubledPlayers = null;

const dispatch = createEventDispatcher<{
  DISPATCH_EVENT_NAME: DoubledPlayers;
}>();

function selectConfiguration(doubledPlayers: DoubledPlayers) {
  selectedConfiguration = doubledPlayers;
  dispatch(DISPATCH_EVENT_NAME,selectedConfiguration);
}

$: if(resetEnabled == false) {
  selectedConfiguration = null;
}
</script>

<div class="container" transition:fly={{y: 50, duration: 500}}>
  <p>How many players have doubled shapes?</p>
  <fieldset>
    <div class="options-container">
      <div>
        <input type="radio" id="none"
          on:click={() => selectConfiguration(DoubledPlayers.None)}
          bind:group={selectedConfiguration} value={DoubledPlayers.None} />
        <label for="none">None</label>
      </div>
      <div>
        <input type="radio" id="one"
          on:click={() => selectConfiguration(DoubledPlayers.One)}
          bind:group={selectedConfiguration} value={DoubledPlayers.One} />
        <label for="one">One</label>
      </div>
      <div>
        <input type="radio" id="all"
          on:click={() => selectConfiguration(DoubledPlayers.All)}
          bind:group={selectedConfiguration} value={DoubledPlayers.All} />
        <label for="all">All</label>
      </div>
    </div>
  </fieldset>
</div>

<style>
.options-container {
  display: flex;
  align-items: center;
  justify-items: center;
  gap: clamp(24px, 5vw, 32px);
}

.container {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
}

fieldset {
  border: transparent;
}

label { 
  color: var(--text-color);
  margin: 1vw;
}

p {
  color: var(--text-color);
}
</style>
