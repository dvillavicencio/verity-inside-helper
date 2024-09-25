<script lang="ts">
  import Footer from "$lib/components/core/Footer.svelte";
  import Header from "$lib/components/core/Header.svelte";
  import { fly } from "svelte/transition";

  export let data;
</script>

<Header />
  {#key data.url}
    <div 
      in:fly={{y: -50, delay: 300, duration: 300}}
      out:fly={{y: -50, duration: 300}}>
      <slot />
    </div>
  {/key}
<Footer />
