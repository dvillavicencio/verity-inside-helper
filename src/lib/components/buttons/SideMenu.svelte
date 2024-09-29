<script lang="ts">
import FastStratToggle from "../buttons/FastStratToggle.svelte";
import { X } from "lucide-svelte";
import { fly, fade } from "svelte/transition";
import { quintOut } from "svelte/easing";

export let menuOpen: boolean = false;

const githubLink: string = "https://github.com/dvillavicencio/verity-inside-helper";

function closeMenu() {
  menuOpen = false;
}
</script>

<div class="side-menu-container">
  {#if menuOpen}
    <div class="side-menu" transition:fly={{x: 128, duration: 300, easing: quintOut}}>
      <div class="menu-container">
        <button class="close-button" on:click={closeMenu} aria-label="Close menu">
          <X size={24} />
        </button>
        <div class="nav-options">
          <a href="/" on:click={closeMenu}><div class="menu-option">Home</div></a>
          <a href="/about" on:click={closeMenu}><div class="menu-option">About</div></a> 
          <a href={githubLink} target="_blank" on:click={closeMenu}><div class="menu-option">Source</div></a> 
        </div>
        <div class="fast-strat">
          <span>Fast Strategy</span>
          <FastStratToggle />
        </div>
      </div>
    </div>

    <div class="menu-overlay"
      aria-label="Menu overlay"
      on:click={closeMenu}
      transition:fade={{duration: 200}}>
    </div>
  {/if}
</div>


<style>
a, a:visited {
  text-decoration: none;
}

.close-button {
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
}

.fast-strat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.fast-strat span {
  color: var(--text-color);
}

.nav-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 8rem;
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 1rem;
  pointer-events: auto;
  z-index: 1001;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.side-menu-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
}

.menu-option {
  margin: 1rem 0;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-color);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.5);
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

@media(min-width: 48rem) {
  .side-menu-container {
    display: none; 
  } 
}
</style>
