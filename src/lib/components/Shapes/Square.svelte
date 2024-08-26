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

.square-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: black;
  width: 90px;
  height: 90px;
}

.square-fill {
  position: absolute;
  background-color: white;
  top: 5px;
  left: 5px;
  width: 80px;
  height: 80px;
}

.square-container:active .square-edge {
  background-color: #99B6FF;
}

.square-container:active .square-fill {
  background-color: #EFF6FF;
}

.selected .square-edge {
 background-color: #2D68FE; 
}

@media (min-width: 480px) {
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
  }

  .square-container:hover .square-fill {
    background-color: #EFF6FF;
  }

  .square-container:active .square-fill {
    background-color: #cfe4ff;
  }
}
</style>

<div class="square-container" 
  on:click={handleClick} class:selected={isClicked}>
  <div class="square-edge"></div>
  <div class="square-fill"></div>
</div>
