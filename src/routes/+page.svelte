<script lang="ts">
import Main from "$lib/components/core/Main.svelte";

  function scrollToTop() {
    let top = document.querySelector("header");
    if(top) {
      top.scrollIntoView({ behavior: "smooth", inline: "start", block: "start"});
    }
  }
</script>

<style>
div:last-of-type {
  margin-top: auto;
}
</style>

<div class="main-container">
  <Main on:reset={() => scrollToTop()}/>
</div>

