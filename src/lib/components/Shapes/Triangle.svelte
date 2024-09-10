<script lang="ts">
  import { createEventDispatcher } from 'svelte'; 

  export let isClicked: boolean = false;

  const dispatch = createEventDispatcher();
  function handleClick() {
    isClicked = !isClicked;
    dispatch('select');
  }
</script>

<style>
.triangle-container {
  position: relative;
  width: 90px;
  height: 90px;
}

.triangle-edge, .triangle-fill {
  transition: border-bottom-color 0.5s ease;
}

.triangle-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 45px solid transparent;
  border-right: 45px solid transparent;
  border-bottom: 90px solid var(--outline-color);
}

.triangle-fill {
  position: absolute;
  width: 0;
  height: 0;
  top: 8.69px;
  left: 7.5px;
  border-left: 37.5px solid transparent;
  border-right: 37.5px solid transparent;
  border-bottom: 75px solid var(--background-color); 
}

.triangle-container:active .triangle-edge {
  border-bottom-color: #99B6FF;
}

.triangle-container:active .triangle-fill {
  border-bottom-color: var(--hover-color);
}

.selected .triangle-edge {
  border-bottom-color: #2D68FE;
  transition: 0s;
}

@media(min-width: 50em) {
  .triangle-container {
    width: 110px;
    height: 110px;
  }

  .triangle-edge, .triangle-fill {
    transition: border-bottom-color 0.5s ease;
  }

  .triangle-edge {
    border-left: 55px solid transparent;
    border-right: 55px solid transparent;
    border-bottom: 110px solid var(--outline-color);
  }

  .triangle-fill {
    top: 8.69px;
    left: 7.5px;
    border-left: 47.5px solid transparent;
    border-right: 47.5px solid transparent;
    border-bottom: 95px solid var(--background-color); 
  }

  .triangle-container:hover .triangle-edge {
    border-bottom-color: #2D68FE;
    transition-duration: 0s;
  }

  .triangle-container:hover .triangle-fill {
    border-bottom-color: var(--hover-color); 
    transition-duration: 0s;
  }

  .triangle-container:active .triangle-fill {
    border-bottom-color: var(--active-color);
    transition-duration: 0s;
  }
}
</style>

<div class="triangle-container" on:click={handleClick} class:selected={isClicked}> 
  <div class="triangle-edge"></div>
  <div class="triangle-fill"></div>
</div>
