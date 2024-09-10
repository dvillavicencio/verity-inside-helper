<script lang="ts">
  import { createEventDispatcher } from 'svelte'; 

  export let isClicked:boolean = false;

  const dispatch = createEventDispatcher();
  function handleClick() {
    isClicked = !isClicked;
    dispatch('select');
  }
</script>

<style>
.circle-container {
  position: relative;
  width: 90px;
  height: 90px;
}

.circle-edge, .circle-fill {
  transition: background-color 0.5s ease;
}

.circle-edge {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: var(--outline-color);
  width: 90px;
  height: 90px;
}

.circle-fill {
  position: absolute;
  background-color: var(--background-color);
  border-radius: 50%;
  top: 5px;
  left: 5px;
  width: 80px;
  height: 80px;
}

.selected .circle-edge {
  background-color: #2D68FE;
}

.circle-container:active .circle-edge {
  background-color: #99B6FF;
}

.circle-container:active .circle-fill {
  background-color: var(--hover-color);
}

@media (min-width: 50rem) {
  .circle-container {
    width: 110px;
    height: 110px;
  }
  
  .circle-edge {
    width: 110px;
    height: 110px;
  }

  .circle-fill {
    top: 5px;
    left: 5px;
    width: 100px;
    height: 100px;
  }

  .circle-container:hover .circle-edge {
    background-color: #2D68FE;
    transition-duration: 0s;
  }

  .circle-container:hover .circle-fill {
    background-color: var(--hover-color);
    transition-duration: 0s;
  }

  .circle-container:active .circle-fill {
    background-color: var(--active-color);
    transition-duration: 0s;
  }
}
</style>

<div class="circle-container" on:click={handleClick} class:selected={isClicked}>
  <div class="circle-edge">
    <div class="circle-fill"></div>
  </div> 
</div>
