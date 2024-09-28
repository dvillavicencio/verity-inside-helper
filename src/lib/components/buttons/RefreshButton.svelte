<script lang="ts">
  import { RotateCcw } from 'lucide-svelte';

  export let onReset: () => void;
</script>

<button class="fixed-reset-button" on:click={onReset} aria-label="Reset all inputs">
  <RotateCcw size={24} />
  <span>Reset</span>
</button>

<style>
  .fixed-reset-button {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background-color: var(--button-bg-color);
    color: var(--text-color);
    border: none;
    border-radius: 50px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    z-index: 1000;
  }

  .fixed-reset-button:hover {
    background-color: var(--button-hover-bg-color);
  }

  .fixed-reset-button:active {
    transform: scale(0.95);
  }

  span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    .fixed-reset-button {
      padding: 0.75rem;
    }

    span {
      display: none;
    }
  }
</style>
