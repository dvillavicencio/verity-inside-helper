<script lang="ts">
  import { Theme } from "../../Enums/Theme.ts";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { themeStore } from "../stores/ThemeStore.ts";

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

<button on:click={themeToggle}>
  {#if theme === Theme.DARK_MODE}
    <svg width="1rem" stroke-width="1" height="1rem" viewBox="0 0 35 35" data-name="Layer 2" id="b6de87db-e731-4627-aba6-6a97c219f0be" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5,25.88a8.38,8.38,0,1,1,8.38-8.38A8.389,8.389,0,0,1,17.5,25.88Zm0-14.26a5.88,5.88,0,1,0,5.88,5.88A5.887,5.887,0,0,0,17.5,11.62Z"/>
      <path d="M17.5,5.471h-.034A1.251,1.251,0,0,1,16.25,4.187l.075-2.721A1.267,1.267,0,0,1,17.609.25a1.251,1.251,0,0,1,1.215,1.284l-.075,2.721A1.249,1.249,0,0,1,17.5,5.471Z"/>
      <path d="M26.893,9.364a1.25,1.25,0,0,1-.859-2.158l1.978-1.871A1.25,1.25,0,0,1,29.73,7.151L27.752,9.022A1.242,1.242,0,0,1,26.893,9.364Z"/>
      <path d="M33.5,18.837h-.036l-2.722-.077a1.249,1.249,0,0,1-1.213-1.284,1.211,1.211,0,0,1,1.285-1.214l2.721.077a1.25,1.25,0,0,1-.035,2.5Z"/>
      <path d="M28.748,30.13a1.248,1.248,0,0,1-.909-.392L25.97,27.759a1.25,1.25,0,1,1,1.817-1.717l1.869,1.98a1.249,1.249,0,0,1-.908,2.108Z"/>
      <path d="M17.4,34.75h-.037a1.249,1.249,0,0,1-1.213-1.285l.079-2.721a1.25,1.25,0,0,1,2.5.072l-.079,2.721A1.249,1.249,0,0,1,17.4,34.75Z"/>
      <path d="M6.112,29.989a1.249,1.249,0,0,1-.857-2.159l1.98-1.867A1.25,1.25,0,1,1,8.95,27.781L6.969,29.648A1.242,1.242,0,0,1,6.112,29.989Z"/>
      <path d="M4.221,18.72H4.184l-2.721-.081A1.25,1.25,0,0,1,.251,17.352,1.237,1.237,0,0,1,1.537,16.14l2.721.081a1.25,1.25,0,0,1-.037,2.5Z"/>
      <path d="M8.135,9.335a1.248,1.248,0,0,1-.91-.393L5.359,6.961a1.25,1.25,0,1,1,1.82-1.715L9.046,7.228a1.251,1.251,0,0,1-.911,2.107Z"/>
    </svg>
  {:else}
    <svg width="1rem" stroke-width="1" height="1em" viewBox="0 0 35 35" data-name="Layer 2" id="Layer_2" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"/>
    </svg>
  {/if}
</button>

<style>
button {
  width: 2rem;
  height: 2rem;
  background: transparent;
  color: var(--text-color);
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

button:hover {
  background: var(--hover-background-color);
}

svg {
  stroke: var(--text-color);
  fill: var(--text-color);
}
</style>
