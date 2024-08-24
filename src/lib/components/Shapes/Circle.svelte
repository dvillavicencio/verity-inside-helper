<script lang="ts">
  import { createEventDispatcher } from 'svelte'; 

  export let isClicked:boolean = false;

  const dispatch = createEventDispatcher();
  function handleClick() {
    isClicked = !isClicked;
    dispatch('select');
  }
</script>

<style>
  .circle-container {
    position: relative;
}

.circle-edge {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: black;
}

.circle-fill {
  position: absolute;
  background-color: white;
  border-radius: 50%;
}

.selected .circle-edge {
  background-color: #2D68FE;
}

.circle-edge:active {
  background-color: #99B6FF; 
}

.circle-fill:active {
  background-color: #EFF6FF;
}

@media (max-width: 480px) {
  .circle-container {
    width: 90px;
    height: 90px;
  }
  
  .circle-edge {
    width: 90px;
    height: 90px;
  }

  .circle-fill {
    top: 5px;
    left: 5px;
    width: 80px;
    height: 80px;
  } 
}
</style>

<div class="circle-container" on:click={handleClick} class:selected={isClicked}>
  <div class="circle-edge">
    <div class="circle-fill"></div>
  </div> 
</div>
