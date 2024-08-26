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

.circle-edge {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: black;
  width: 90px;
  height: 90px;
}

.circle-fill {
  position: absolute;
  background-color: white;
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
  background-color: #EFF6FF;
}

@media (min-width: 480px) {
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
  }

  .circle-container:hover .circle-fill {
    background-color: #EFF6FF;
  }

  .circle-container:active .circle-fill {
    background-color: #cfe4ff;
  }
}
</style>

<div class="circle-container" on:click={handleClick} class:selected={isClicked}>
  <div class="circle-edge">
    <div class="circle-fill"></div>
  </div> 
</div>
