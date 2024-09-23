<script lang="ts">
  import { Theme } from "../../Enums/Theme.ts";
  import { themeStore } from "../stores/ThemeStore.ts";

  let theme: string = "";
  
  themeStore.subscribe((savedTheme) => {
    theme = savedTheme;
  })
</script>

<span class="wrapper">
  {#if theme === Theme.DARK_MODE}
    <div class="light"></div>
  {:else}
    <div class="dark"></div>
  {/if}
  <p class="verity-title">
    <b>Verity Inside Helper</b>
  </p>
</span>

<style>
.wrapper {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.verity-title > b {
  margin: 0.5rem;
  text-align: center;
  color: var(--text-color);
  font-size: 1rem;
}

.dark {
  width: 0;
  height: 0;
  border-left: 0.5em solid transparent;
  border-right: 0.5rem solid transparent;
  border-bottom: 1rem solid var(--text-color);
}

.light {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--outline-color);
}
</style>
