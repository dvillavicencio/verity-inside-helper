<script lang="ts">
  import Header from "$lib/components/core/Header.svelte";
  import Input from "$lib/components/core/Input.svelte";
  import Footer from "$lib/components/core/Footer.svelte";
  import RefreshButton from "$lib/components/buttons/RefreshButton.svelte";
  let header;
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=pt+sans:ital,wght@0,400;0,700;1,400;1,700&family=quicksand:wght@300..700&display=swap');
:root {
  font-family: "PT-Sans", sans-serif; 
}

div:last-of-type {
  margin-top: auto;
}
</style>

<div class="main-container">
  <Header bind:this={header}/>
  <Input on:reset={() => header.scrollToTop()}/>
  <Footer />
</div>

