<script lang="ts">
  import { spring } from 'svelte/motion';
  import { Zap, Turtle } from 'lucide-svelte';
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { strategyModeStore } from "../stores/StrategyModeStore.ts";

  const FAST_STRATEGY_ENABLED: string = "fast-strategy-enabled"

  // default is normal-mode
  let isFastStrategy: boolean = false;

  const position = spring(0, {
    stiffness: 0.3,
    damping: 0.8
  });

  onMount(() => {
    if(browser) {
      const savedMode = window.localStorage.getItem(FAST_STRATEGY_ENABLED);
      isFastStrategy = savedMode === 'true';
      position.set(isFastStrategy ? 1 : 0);
      strategyModeStore.set(isFastStrategy);
    }
});

  $: position.set(isFastStrategy ? 1 : 0);
  
  function toggleStrategy() {
    isFastStrategy = !isFastStrategy;
    position.set(isFastStrategy ? 1 : 0);
    strategyModeStore.update(currentMode => !currentMode);
    if (browser) {
      window.localStorage.setItem(FAST_STRATEGY_ENABLED, isFastStrategy.toString());
    }
  }
</script>

<button class="strategy-slider" on:click={toggleStrategy} aria-label="Toggle strategy mode">
  <div class="slider-track">
    <div class="slider-thumb" style="transform: translateX({$position * 1.5}rem)">
      {#if isFastStrategy}
        <Zap size={16} />
      {:else}
        <Turtle size={16} />
      {/if}
    </div>
  </div>
  <div class="strategy-labels">
    <span class:active={!isFastStrategy}>Normal</span>
    <span class:active={isFastStrategy}>Fast</span>
  </div>
</button>

<style>
  .strategy-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
  }

  .slider-track {
    width: 3rem;
    height: 1.5rem;
    background-color: var(--slider-color);
    border-radius: 14px;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s ease;
  }

  .slider-thumb {
    width: 1.5rem;
    height: 1.5rem;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333;
    transition: color 0.3s ease;
  }

  .strategy-labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 4px;
    font-size: 10px;
    font-weight: 500;
  }

  .strategy-labels span {
    color: var(--text-secondary-color);
    transition: color 0.3s ease;
  }

  .slider-thumb :global(svg){
    stroke: black;
  }

  .strategy-labels span.active {
    color: var(--text-color);
  }
</style>
