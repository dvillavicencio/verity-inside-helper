<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Solution } from "../../types/Solution.ts";
  import { Square, CheckSquare } from 'lucide-svelte';

  export let solution: Solution;
  export let strategy: string;

  let completedSteps: boolean[] = new Array(solution.steps.length).fill(false);
  
  const dispatch = createEventDispatcher();

  function toggleStep(index: number) {
    completedSteps[index] = !completedSteps[index];
    completedSteps = [...completedSteps];
    dispatch('progress', { completed: completedSteps.filter(Boolean).length, total: steps.length });
  }

  $: progress = (completedSteps.filter(Boolean).length / solution.steps.length) * 100;
</script>

<div class="checklist-guide">
  <h3 class="title">{@html solution.title}</h3>
  <p class="description">{@html solution.description}</p>
  <div class="progress-bar">
    <div class="progress" style="width: {progress}%"></div>
  </div>
  <p class="progress-text">
    {completedSteps.filter(Boolean).length} of {solution.steps.length} steps completed
  </p>
  <ul class="step-list">
    {#each solution.steps as step, i}
      <li
        class="step-item"
        class:completed={completedSteps[i]}
        on:click={() => toggleStep(i)}
        in:fade={{ duration: 200, delay: i * 100 }}>
        <div class="step-checkbox">
          {#if completedSteps[i]}
            <CheckSquare size={20} />
          {:else}
            <Square size={20} />
          {/if}
        </div>
        <span class="step-text">{@html step}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .checklist-guide {
    background-color: var(--background-color);
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 20rem;
    margin: 0 auto;
  }

  .title {
    text-align: center;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .description {
    text-align: center;
    color: var(--text-color);

  }

  .progress-bar {
    height: 4px;
    background-color: var(--border-color);
    border-radius: 2px;
    margin-bottom: 0.5rem;
  }

  .progress {
    height: 100%;
    background-color: var(--selected-color);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .progress-text {
    text-align: center;
    color: var(--text-color);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .step-list {
    list-style-type: none;
    padding: 0;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    padding: 0.5rem 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .step-checkbox {
    margin-right: 0.5rem;
    color: var(--text-color);
  }

  .step-text {
    color: var(--text-color);
  }

  .completed .step-text {
    text-decoration: line-through;
    opacity: 0.6;
  }
</style>
