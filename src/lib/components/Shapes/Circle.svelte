<script>
  let isClicked = false;
  function handleClick() { 
    isClicked = !isClicked;
  }
</script>

<style>
  .circle-container {
    position: relative;
    width: 5vw;
    height: 5vw;
    margin: .2vw; 
}

.circle-edge {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: black;
  width: 5vw;
  height: 5vw;
}

.circle-fill {
  position: absolute;
  top: .25vw;
  left: .25vw;
  background-color: white;
  width: 4.50vw;
  height: 4.50vw;
  border-radius: 50%;
}

.circle-container:hover .circle-edge {
  background-color: #99B6FF; 
}

.circle-container:hover .circle-fill {
  background-color: #EFF6FF;
}

.selected .circle-edge {
  background-color: #2D68FE;
}

</style>

<div class="circle-container" on:click={handleClick} class:selected={isClicked}>
  <div class="circle-edge">
    <div class="circle-fill"></div>
  </div> 
</div>
