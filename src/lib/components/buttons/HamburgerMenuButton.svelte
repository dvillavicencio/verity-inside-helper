<script lang="ts">
let menuOpen: boolean = false;

const githubLink: string = "https://github.com/dvillavicencio/verity-inside-helper";

function toggleMenu() {
  menuOpen = !menuOpen;
}
</script>

<span class="wrapper" on:click={toggleMenu}>
  <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18L20 18" stroke-width="2" stroke-linecap="round"/>
    <path d="M4 12L20 12" stroke-width="2" stroke-linecap="round"/>
    <path d="M4 6L20 6" stroke-width="2" stroke-linecap="round"/>
  </svg>
</span>

<div class="side-menu" class:open={menuOpen}>
  <div class="menu-container">
    <div class="nav-options">
      <a href="/" on:click={toggleMenu}><div class="menu-option">Home</div></a>
      <a href="/about" on:click={toggleMenu}><div class="menu-option">About</div></a> 
      <a href={githubLink} target="_blank" on:click={toggleMenu}><div class="menu-option">Source</div></a> 
    </div>
    <div class="settings-options">
      <div class="menu-option">
        <input type="radio" />
      </div>
    </div>
  </div>
</div>

{#if menuOpen}
  <div class="menu-overlay" on:click={toggleMenu}></div>
{/if}

<style>
a, a:visited {
  text-decoration: none;
}

path {
  stroke: var(--text-color);
}

.wrapper {
  height: 1rem;
  width: 1rem;
  padding: 0.5rem;
}

.wrapper:hover {
  background-color: var(--hover-background-color);
  cursor: pointer;
}

.nav-options {
  display: none;
}

.side-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 8rem;
    background-color: var(--background-color);
    color: white;
    padding: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 3;
  }

  .side-menu.open {
    transform: translateX(0);
  }

  .menu-option {
    margin: 1rem 0;
    font-size: 1rem;
    cursor: pointer;
    color: var(--text-color);
  }

  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media(min-width: 48rem) {
      
  }
</style>
