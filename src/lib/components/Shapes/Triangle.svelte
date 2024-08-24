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
}

.triangle-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.triangle-fill {
  position: absolute;
  width: 0;
  height: 0;
}

.triangle-edge, .triangle-container:active .triangle-edge {
  border-bottom-color: #99B6FF;
}

.triangle-fill, .triangle-container:active .triangle-fill {
  border-bottom-color: #EFF6FF;
}

.selected .triangle-edge {
  border-bottom-color: #2D68FE;
}

@media(max-width: 480px) {
  .triangle-container {
    width: 90px;
    height: 90px;
  }

  .triangle-edge {
    border-left: 45px solid transparent;
    border-right: 45px solid transparent;
    border-bottom: 90px solid black;
  }

  .triangle-fill {
    top: 8.69px;
    left: 7.5px;
    border-left: 37.5px solid transparent;
    border-right: 37.5px solid transparent;
    border-bottom: 75px solid white; 
  }
}
</style>

<div class="triangle-container" on:click={handleClick} class:selected={isClicked}> 
  <div class="triangle-edge"></div>
  <div class="triangle-fill"></div>
</div>
