<script lang="ts">
  const GITHUB_URL: String = "https://github.com/dvillavicencio";
</script>

<style>
footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin-top: auto;
  background-color: var(--background-color);
}

.madeBy {
  grid-column: 2;
}

a {
  color: var(--text-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: var(--text-color);
  text-decoration: none;
}

p {
  color: var(--text-color);
}
</style>

<footer>
  <div class="madeBy">
    <p>Made by 
      <a href={GITHUB_URL} target="blank">Deahtstroke</a>
    </p>
  </div> 
</footer>
