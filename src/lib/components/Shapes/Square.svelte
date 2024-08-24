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
}

.square-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: black;
}

.square-fill {
  position: absolute;
  background-color: white;
}

.square-container:hover, .square-container:active .square-edge {
  background-color: #99B6FF;
}

.square-container.hover, .square-container:active .square-fill {
  background-color: #EFF6FF;
}

.selected .square-edge {
 background-color: #2D68FE; 
}

@media (max-width: 480px) {
  .square-container {
    width: 90px;
    height: 90px;
  }

  .square-edge {
    width: 90px;
    height: 90px;
  }

  .square-fill {
    top: 5px;
    left: 5px;
    width: 80px;
    height: 80px;
  }
}
</style>

<div class="square-container" 
  on:click={handleClick} class:selected={isClicked}>
  <div class="square-edge"></div>
  <div class="square-fill"></div>
</div>
