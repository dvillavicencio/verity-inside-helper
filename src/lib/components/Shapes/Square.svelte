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
.square-container {
  position: relative;
  width: 90px;
  height: 90px;
}

.square-edge, .square-fill {
  transition: background-color 0.5s ease;
}

.square-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--outline-color);
  width: 90px;
  height: 90px;
}

.square-fill {
  position: absolute;
  background-color: var(--background-color);
  top: 5px;
  left: 5px;
  width: 80px;
  height: 80px;
}

.square-container:active .square-edge {
  background-color: #99B6FF;
}

.square-container:active .square-fill {
  background-color: var(--hover-color);
}

.selected .square-edge {
 background-color: #2D68FE; 
}

@media (min-width: 50em) {
  .square-container {
    width: 110px;
    height: 110px;
  }

  .square-edge {
    width: 110px;
    height: 110px;
  }

  .square-fill {
    top: 5px;
    left: 5px;
    width: 100px;
    height: 100px;
  }

  .square-container:hover .square-edge {
    background-color: #2D68FE;
    transition-duration: 0s;
  }

  .square-container:hover .square-fill {
    background-color: var(--hover-color);
    transition-duration: 0s;
  }

  .square-container:active .square-fill {
    background-color: var(--active-color);
    transition-duration: 0s;
  }
}
</style>

<div class="square-container" 
  on:click={handleClick} class:selected={isClicked}>
  <div class="square-edge"></div>
  <div class="square-fill"></div>
</div>
