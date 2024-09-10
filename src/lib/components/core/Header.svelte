<script lang="ts">
  import { Theme } from "../../Enums/Theme.ts";
  import { browser } from "$app/environment";
  import { themeStore } from "../stores/ThemeStore.ts";
  import { onMount } from "svelte";
  import ThemeButton from "../buttons/ThemeButton.svelte";

  const THEME_KEY: string = "theme";

  export function scrollToTop() {
    let top = document.querySelector("header");
    if(top) {
      top.scrollIntoView({ behavior: "smooth", inline: "start", block: "start"});
    }
  }

  let isDarkMode: boolean;
  onMount(() => {
    if(browser) {
      const currentTheme = localStorage.getItem(THEME_KEY);
      isDarkMode = currentTheme ? currentTheme === Theme.DARK_MODE : false; 
      themeStore.set(currentTheme);
    }
  })
 
  themeStore.subscribe((theme) => {
    isDarkMode = theme === Theme.DARK_MODE;
  })
</script>

<style>
header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: .1vw;
  column-gap: .5vw;
  width: 100%;
  background-color: var(--background-color);
  transition: background-color 0.5s ease;
}

.verity-title {
  margin: 1rem;
  text-align: center;
  color: var(--text-color);
  grid-column: 2;
  transtion: color 0.3s ease;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5vw;
}

.github-button, .theme-toggle {
  cursor: pointer;
}

.container { 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5vw;
}

a {
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4vw;
}

a:visited {
  color: var(--text-color);
}

a:hover, a:active {
  text-decoration: underline;
}

.verity-title {
  font-size: 2em;
}

.theme-toggle {
  font-size: 16px; 
}
.github-link {
  font-size: 16px;
}

.theme-toggle {
  font-size: 16px;
  width: 40px;
  height: 20px;
}

@media(max-width: 42rem) {
  .container {
    display: none;
  } 
}
</style>

<header>
  <div class="container">
    <a class="github-link" href="https://github.com/dvillavicencio/verity-inside-helper" target="_blank">
      {#if isDarkMode}
        <img src="icons/github-light.svg" width="16px" height="16px"/>
      {:else}
        <img src="icons/github-dark.svg" width="16px" height="16px"/>
      {/if}
      Source
    </a>
  </div>
  <h1 class="verity-title">Verity Helper (Inside)</h1> 
  <div class="container">
    <ThemeButton />
  </div>
</header>
