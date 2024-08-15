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
.triangle-container {
  position: relative;
  width: 5vw;
  height: 5vw;
  margin: .2vw;
}

.triangle-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 2.5vw solid transparent;
  border-right: 2.5vw solid transparent;
  border-bottom: 5vw solid black;
}

.triangle-fill {
  position: absolute;
  top: .475vw;
  left: .387vw; 
  width: 0;
  height: 0;
  border-left: 2.125vw solid transparent;
  border-right: 2.125vw solid transparent;
  border-bottom: 4.25vw solid white;
}

.triangle-container:hover .triangle-edge {
  border-bottom-color: #99B6FF;
}

.triangle-container:hover .triangle-fill {
  border-bottom-color: #EFF6FF;
}

.selected .triangle-edge {
  border-bottom-color: #2D68FE;
}

</style>

<div class="triangle-container" on:click={handleClick} class:selected={isClicked}> 
  <div class="triangle-edge"></div>
  <div class="triangle-fill"></div>
</div>
