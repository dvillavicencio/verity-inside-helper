<script>

</script>
<style>
.header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: .1vw;
  column-gap: .5vw;
  width: 100%;
}

.verity-title {
  margin: 1vw;
  text-align: center;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5vw;
}

.github-button, .theme-toggle {
  padding: 5px 10px;
  cursor: pointer;
}

.empty { }
</style>

<div class="header">
  <div class="empty"></div>
  <h1 class="verity-title">Verity Helper (Inside)</h1> 
  <div class="buttons">
    <a class="github-button">Source</a>
    <button class="theme-toggle">Dark/Light Mode</button>
  </div>
</div>
