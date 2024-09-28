<script lang="ts">
  import { fly } from 'svelte/transition';
  import { X } from 'lucide-svelte';

  export let message: string;
  export let visible: boolean;
  export let onClose: () => void;
</script>

{#if visible}
  <div class="notification-container" transition:fly={{ y: 50, duration: 300 }}>
    <p>{message}</p>
    <button on:click={onClose} aria-label="Close notification">
      <X size={20} />
    </button>
  </div>
{/if}

<style>
  .notification-container {
    position: fixed;
    bottom: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--error-bg-color, #ff5555);
    color: var(--error-text-color, white);
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.33rem rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 90%;
    width: 300px;
    z-index: 1000;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }

  button {
    background: none;
    border: none;
    color: var(--error-text-color, white);
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
  }
</style>
