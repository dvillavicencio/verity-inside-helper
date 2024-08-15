<script>
  import { createEventDispatcher } from 'svelte'; 
  export let isClicked=false;

  const disptacher = createEventDispatcher();
  function handleClick() {
    isClicked = !isClicked;
    dispatcher('click');
  } 
</script>

<style>
.square-container {
  position: relative;
  width: 5vw;
  height: 5vw;
  margin: .2vw;
}

.square-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: black;
  width: 5vw;
  height: 5vw;
}

.square-fill {
  position: absolute;
  top: .25vw;
  left: .25vw;
  background-color: white;
  width: 4.5vw;
  height: 4.5vw;
}

.square-container:hover .square-edge {
  background-color: #99B6FF;
}

.square-container.hover .square-fill {
  background-color: #EFF6FF;
}

.selected .square-edge {
 background-color: #2D68FE; 
}
</style>

<div class="square-container" 
  on:click={handleClick} class:selected={isClicked}>
  <div class="square-edge"></div>
  <div class="square-fill"></div>
</div>
