<script lang="ts">
  import { onMount } from 'svelte';
  import { Theme } from "../../Enums/Theme.ts";
  import { Menu, X, Moon, Sun } from 'lucide-svelte';
  import Logo from "./Logo.svelte";
  import ThemeButton from "../buttons/ThemeButton.svelte";
  import SideMenu from "../buttons/SideMenu.svelte";
  import FastStratToggle from "../buttons/FastStratToggle.svelte";
  import { strategyModeStore } from "../stores/StrategyModeStore.ts";

  let isMobileMenuOpen: boolean = false;
  let isFastStratgy: boolean = false;
  let windowWidth = 0;

  onMount(() => {
    const handleResize = () => {
      windowWidth = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });

  $: strategyModeStore.subscribe(value => {
    isFastStratgy = value;
  })

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<header>
  <div class="header-content">
      <div class="logo">
        <a href="/"><span>Verity Inside Helper</span></a>
      </div>
    {#if windowWidth > 768}
      <nav class="desktop-nav">
        <a href="/about">About</a>
        <a href="https://github.com/dvillavicencio/verity-inside-helper"
          target="_blank"
          rel="noopener noreferrer">
          Source
        </a>
        <FastStratToggle />
        <ThemeButton />
      </nav>
    {:else} 
      <div class="mobile-controls">
        <ThemeButton />
        <button on:click={toggleMobileMenu} class="menu-toggle" aria-label="Toggle menu">
          <Menu />
        </button>
      </div>
    {/if}
  </div>

  <SideMenu bind:menuOpen={isMobileMenuOpen}/> 
</header>

<style>
  header {
    position: relative;
    z-index: 1000;
    background-color: var(--background-color); 
  }

  a {
    text-decoration: none;
  }

  .header-content {
    max-width: 48rem;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo span {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
  }

  .menu-toggle {
    background-color: var(--background-color);
    border-style: none;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .desktop-nav a, .mobile-nav a {
    text-decoration: none;
    color: var(--text-color);
  }

  .mobile-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  :global(svg) {
    stroke: var(--outline-color);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--background-color);
  }

  .mobile-nav > * {
    margin-bottom: 1rem;
  }

  .theme-toggle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
  }
</style>
