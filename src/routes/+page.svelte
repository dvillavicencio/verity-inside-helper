<script>
  import ShapeSelector from "../lib/components/StatueShapeSelector/StatueSelector.svelte";
  import Header from "../lib/components/header/Header.svelte";
</script>
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="container">
  <Header />
  <ShapeSelector />
</div>

