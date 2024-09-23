<script lang="ts">
  import Footer from "$lib/components/core/Footer.svelte";
  import Header from "$lib/components/core/Header.svelte";
  import { fade } from "svelte/transition";
</script>
 
<Header />
<slot />
<Footer />
