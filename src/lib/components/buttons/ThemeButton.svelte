<script lang="ts">
  import { Theme } from "../../Enums/Theme.ts";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { themeStore } from "../stores/ThemeStore.ts";
  import { fly } from "svelte/transition";

  const THEME_KEY_NAME: string = 'theme';

  // defualt theme is light_mode
  let theme: string = Theme.LIGHT_MODE;

  onMount(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY_NAME);
    theme = savedTheme ? savedTheme : Theme.LIGHT_MODE;
    document.documentElement.setAttribute(THEME_KEY_NAME, theme);
    themeStore.set(theme);
  });

  function themeToggle() {
    theme = theme === Theme.LIGHT_MODE ? Theme.DARK_MODE : Theme.LIGHT_MODE; 
    themeStore.set(theme);
    document.documentElement.setAttribute(THEME_KEY_NAME, theme);
  }

  $: if (browser) {
    window.localStorage.setItem(THEME_KEY_NAME, theme);
  }

</script>

<button on:click={themeToggle}>
  {#if theme === Theme.DARK_MODE}
    <div class="light" transtion:fly={{y: 50, duration: 500}}></div>
  {:else}
    <div class="dark" transtion:fly={{y: 50, duration: 500}}></div>
  {/if}
</button>

<style>
button {
  width: 40px;
  height: 40px;
  background: var(--background-color);
  color: var(--text-color);
  border-color: var(--outline-color);
  border-style: solid;
  cursor: pointer;
}

button {}

.dark {
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 24px solid black;
}

.light {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--outline-color);
}
</style>
