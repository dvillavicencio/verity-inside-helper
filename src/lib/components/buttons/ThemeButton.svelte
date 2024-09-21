<script lang="ts">
  import { Theme } from "../../Enums/Theme.ts";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { themeStore } from "../stores/ThemeStore.ts";

  const THEME_KEY_NAME: string = 'theme';

  // defualt theme is light_mode
  let theme: string = browser ? localStorage.getItem(THEME_KEY_NAME) : Theme.LIGHT_MODE;

  onMount(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY_NAME);
    theme = savedTheme ? savedTheme : Theme.LIGHT_MODE;
    document.documentElement.setAttribute(THEME_KEY_NAME, theme);
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
    <div class="light"></div>
  {:else}
    <div class="dark"></div>
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
