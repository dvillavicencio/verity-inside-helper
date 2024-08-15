<script>
  import Triangle from "../Shapes/Triangle.svelte";
  import Circle from "../Shapes/Circle.svelte";
  import Square from "../Shapes/Square.svelte";

  let selectedShape = null;

  function handleClick(shape) {
    if(selectedShape === shape) {
      selectedShape = null;
    } else {
      selectedShape == shape;
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 1vw;
  }
  .shape-container {
    display: flex;
    gap: 5vw;
  }
</style>

<div class="container">
  <p>What shapes appear on your wall?</p>
  <div class="shape-container">
    <Triangle isClicked={selectedShape === 'triangle'} on:click={() => handleClick('triangle')}/>
    <Circle isClicked={selectedShape === 'circle'} on:click={() => handleClick('circle')}/>
    <Square isClicked={selectedShape === 'square'} on:click={() => handleClick('square')}/>
  </div>
</div>
