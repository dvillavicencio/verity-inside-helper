<script>
</script>
<style>
.button-container {
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2vw;
}

.container {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
}

fieldset {
  border: transparent;
}
</style>
<div class="container">
  <p>Where is your statue?</p>
  <fieldset>
    <div class="button-container">
      <div>
        <input type="radio" id="left" name="statueLocation"/> 
        <label for="left">Left</label>
      </div>
      <div>
        <input type="radio" id="mid" name="statueLocation"/>    
        <label for="mid">Mid</label>                         
      </div> 
      <div>
        <input type="radio" id="right" name="statueLocation"/> 
        <label for="right">Right</label>                       
      </div> 
    </div>
  </fieldset>
</div>

