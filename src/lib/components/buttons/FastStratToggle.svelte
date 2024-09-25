<script lang="ts">
import { toggleStore } from "../stores/ToggleStore.ts";
import { browser } from "$app/environment";
import { onMount } from "svelte";
import Switch from "svelte-switch";

const FAST_STRATEGY_ENABLED: string = "fast-strategy-enabled";

let checkedValue: boolean = false;
if(browser) {
  let storedMode = window.localStorage.getItem(FAST_STRATEGY_ENABLED);
  if(storedMode !== null) {
    checkedValue = storedMode;
  }
}

onMount(() => {
  const savedMode = window.localStorage.getItem(FAST_STRATEGY_ENABLED);
  checkedValue = savedMode ? savedMode : false;
  console.log("Saved mode: " + savedMode);
  console.log("Checked Value: " + checkedValue);
  toggleStore.set(savedMode);
})

function handleToggleChange(e) {
  const { checked } = e.detail;
  checkedValue = checked;
  toggleStore.update((currentMode) => currentMode = checkedValue);
}

$: if (browser) {
    window.localStorage.setItem(FAST_STRATEGY_ENABLED, checkedValue); 
  }
</script>

<span class="fast-strat">
  Fast Strategy
  <Switch on:change={handleToggleChange} height={14} width={28} checked={checkedValue} />
</span>

<style>
.fast-strat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
</style>
