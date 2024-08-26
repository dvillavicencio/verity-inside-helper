<script lang="ts">
  const GITHUB_URL: String = "https://github.com/dvillavicencio";
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin-top: 0;
  margin-bottom: -10px;
}

.madeBy {
  grid-column: 2;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: black;
  text-decoration: none;
}
</style>

<div class="container">
  <div class="madeBy">
    <p>Made by 
      <a href={GITHUB_URL} target="blank">Deahtstroke</a>
    </p>
  </div> 
</div>
