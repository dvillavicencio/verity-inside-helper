<script>
  import Triangle from "../Shapes/Triangle.svelte";
  import Circle from "../Shapes/Circle.svelte";
  import Square from "../Shapes/Square.svelte";
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
  <p>What shape is your statue holding?</p>
  <div class="shape-container">
    <Triangle />
    <Circle />
    <Square />
  </div>
</div>
