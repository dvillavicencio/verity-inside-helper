<script lang="ts">
  import { StatueLocation } from "../../Enums/StatueLocation.ts";
  import { createEventDispatcher } from "svelte";

  const DISPATCH_EVENT_NAME: String = "statueSelect"; 

  export let resetEnabled: boolean;
  
  let selectedLocation: StatueLocation = null;

  const dispatch = createEventDispatcher<{
    DISPATCH_EVENT_NAME: StatueLocation;
  }>();
  
  function selectStatue(position: StatueLocation) {
    selectedLocation = position;
    dispatch(DISPATCH_EVENT_NAME, position);
  }

  $: if(resetEnabled === false) {
    selectedLocation = null;
  } 
</script>

<style>
.button-container {
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
}

label {
  margin: 1vw;
}

p {
  color: var(--text-color);
}
</style>
<div class="container">
  <p>Where is your statue?</p>
  <fieldset>
    <div class="button-container">
      <div>
        <input type="radio" id="left" name="statueLocation" 
          on:click={() => selectStatue(StatueLocation.Left)}
          bind:group={selectedLocation} value={StatueLocation.Left}/> 
        <label for="left">Left</label>
      </div>
      <div>
        <input type="radio" id="mid" name="statueLocation"
          on:click={() => selectStatue(StatueLocation.Mid)}
          bind:group={selectedLocation} value={StatueLocation.Mid}/>
        <label for="mid">Mid</label>
      </div> 
      <div>
        <input type="radio" id="right" name="statueLocation"
          on:click={() => selectStatue(StatueLocation.Right)}
          bind:group={selectedLocation} value={StatueLocation.Right}/> 
        <label for="right">Right</label>                       
      </div> 
    </div>
  </fieldset>
</div>

