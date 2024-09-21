<script lang="ts">
  import GenericShape from "./GenericShape.svelte";
  import { Shape } from "../../Enums/Shape.ts"; 

  import { createEventDispatcher } from "svelte";

  export let resetEnabled: boolean;
   
  let shapes: Shape[] = [];
  let doubled: boolean = false;
 
  $: shouldDisableCheckmark = shapes.length > 1 && shapes[0] !== shapes[1];

  $: isTriangleClicked = shapes.includes(Shape.Triangle);
  $: isCircleClicked = shapes.includes(Shape.Circle);
  $: isSquareClicked = shapes.includes(Shape.Square);

  $: if(resetEnabled === false) {
    shapes = [];
    doubled = false;
  }

  const dispatch = createEventDispatcher<{
    shapes: Shape[]; 
  }>();

  function isShapeClicked(shape: Shape) {
    return shapes.includes(shape);
  }
    
  function addShape(shape: Shape) {
    if(shapes.includes(shape)) {
      shapes = shapes.filter(s => s !== shape);
    } else {
      if(shapes.length < 2) {
        shapes = [...shapes, shape];
      } else {
        [, ...shapes] = shapes; 
        shapes = [...shapes, shape];
      }
    }

    if(shapes.length == 2) {
      dispatch('shapes', shapes)
    }
  }

  function doubleShape() {
    if(shapes.length >= 1 && shapes.length !== 0) {
      let existingShape: Shape = shapes[0];
      shapes = [...shapes, existingShape];
    } else if (shapes.length > 1){
      throw new Error('You cannot double a shape because you already chose two shapes already');
    } else {
      throw new Error('Something went wrong when doubling the shapes');
    }
    
    dispatch('shapes', shapes);
  }
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1vw;
  gap: 1vw;
}

.shape-container {
  display: flex;
  gap: clamp(16px, 5vw, 32px); 
  marign: 1vw;
}

.checkbox-container {
  width: 100%;
  display: flex;
  justify-content: flex-start; 
  margin: 1vw;
}

p {
  color: var(--text-color);
  transition: color 0.3s ease;
} 

label {
  color: var(--text-color);
  transtion: color 0.3s ease;
}
</style>

<div class="container">
  <p>What shapes appear on your wall?</p>
  <div class="shape-container">
    <GenericShape shapeType={Shape.Triangle} isClicked={isTriangleClicked} on:select={() => addShape(Shape.Triangle)}/>
    <GenericShape shapeType={Shape.Circle} isClicked={isCircleClicked} on:select={() => addShape(Shape.Circle)}/>
    <GenericShape shapeType={Shape.Square} isClicked={isSquareClicked} on:select={() => addShape(Shape.Square)}/>
  </div>
  <div class="checkbox-container">
    <div class="doubled">
      <input type="checkbox" id="doubled" 
        disabled={shouldDisableCheckmark} 
        on:click={doubleShape} 
        bind:checked={doubled}
      />
      <label for="doubled">Doubled</label>
    </div>
  </div>
</div>
