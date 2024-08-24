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
  cursor: pointer;
}

.container { 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5vw;
}

a {
  color: black;
  text-decoration: none;
}

a:visited {
  color: black;
}

a:hover {
  text-decoration: underline;
}

@media(max-width: 480px) {
  .verity-title {
    font-size: 18px;
  }

  .theme-toggle {
    font-size: 16px; 
  }

  .github-link {
    font-size: 16px;
  }

  .theme-toggle {
    font-size: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>

<div class="header">
  <div class="container">
    <a class="github-link" href="https://github.com/dvillavicencio/verity-inside-helper" target="blank">
      Source
    </a>
  </div>
  <h1 class="verity-title">Verity Helper (Inside)</h1> 
  <div class="container">
    <button class="theme-toggle"></button>
  </div>
</div>
