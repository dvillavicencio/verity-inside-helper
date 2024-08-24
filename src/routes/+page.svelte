<script lang="ts">
  import StatueShapeSelector from "../lib/components/StatueShapeSelector/StatueShapeSelector.svelte";
  import Header from "../lib/components/header/Header.svelte";
  import InputDisplay from "../lib/components/InputDisplay//InputDisplay.svelte";
  import Footer from "../lib/components/Footer/Footer.svelte";
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=pt+sans:ital,wght@0,400;0,700;1,400;1,700&family=quicksand:wght@300..700&display=swap');
:root {
  font-family: "PT-Sans", sans-serif; 
}

.main-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

div:last-of-type {
  margin-top: auto;
}
</style>

<div class="main-container">
  <Header />
  <InputDisplay />
  <div class="footer">
     <Footer />
  </div>
</div>

