<script>
  import StatueSelector from "../lib/components/StatueShapeSelector/StatueSelector.svelte";
  import Header from "../lib/components/header/Header.svelte";
  import ShapeSelector from "../lib/components/ShapeSelector/ShapeSelector.svelte";
  import StatueLocationSelector from "../lib/components/StatueLocationSelector/StatueLocationSelector.svelte";
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
  <StatueLocationSelector />
  <StatueSelector />
  <ShapeSelector />
</div>

