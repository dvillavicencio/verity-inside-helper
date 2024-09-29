<script lang="ts">
  import { Theme } from "../../Enums/Theme.ts";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { themeStore } from "../stores/ThemeStore.ts";
  import { Moon, Sun } from "lucide-svelte";

  const THEME_KEY_NAME: string = 'theme';

  // default theme is light_mode
  let theme: string = Theme.LIGHT_MODE;

  if(browser) {
    let localStorageTheme = window.localStorage.getItem(THEME_KEY_NAME);
    if(localStorageTheme !== null) {
      theme = localStorageTheme;
    }
  }

  onMount(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY_NAME);
    theme = savedTheme ? savedTheme : Theme.LIGHT_MODE;
    document.documentElement.setAttribute(THEME_KEY_NAME, theme);
    themeStore.set(theme);
  });

  function themeToggle() {
    theme = theme === Theme.LIGHT_MODE ? Theme.DARK_MODE : Theme.LIGHT_MODE; 
    themeStore.update((currentTheme) => currentTheme = theme);
    document.documentElement.setAttribute(THEME_KEY_NAME, theme);
  }

  $: if (browser) {
    window.localStorage.setItem(THEME_KEY_NAME, theme);
  }
</script>

<button on:click={themeToggle} class="theme-toggle" aria-label="Toggle dark mode">
  {#if theme == Theme.DARK_MODE}
    <Sun />
  {:else}
    <Moon />
  {/if}
</button>

<style>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}
</style>
