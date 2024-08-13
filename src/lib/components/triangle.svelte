<script>
let isClicked=false;
function handleClick() {
  isClicked = !isClicked;
}
</script>

<style>
.triangle-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 20px;
}
.triangle-fill, .triangle-edge {
position: absolute;
top: 0;
left: 0;
width: 0;
height: 0;
}

.triangle-edge {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid black;
}

.triangle-fill {
  top: 5px;
  left: 4px;
  border-left: 46px solid transparent;
  border-right: 46px solid transparent;
  border-bottom: 92px solid white;
}

.triangle-container:hover .triangle-edge {
  border-bottom-color: #99B6FF;
}

.triangle-container:hover .triangler-fill {
  border-bottom-color: #EFF6FF;
}

</style>

<div class="triangle-container {isClicked ? 'clicked' : ''}" on:click={handleClick}> 
  <div class="triangle-edge"></div>
  <div class="triangle-fill"></div>
</div>

