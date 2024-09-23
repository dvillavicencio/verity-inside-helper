<div class="text-container">
  <div class="first-section">
    <h1>What is this?</h1>
    <p class="about-description">
    This is a small web-tool that should help Destiny 2 players figure out the inside portion of the Verity encounter on Salvation's Edge.
    I have ran this encounter quite a bit myself to feel confident on making a small tool for inexperienced players to at least get an idea of what's going on.
    And yeah, I'm aware there's other tools like this out there, but I wanted to make my own.
    </p>
  </div>
  <div class="second-section">
    <h1 class="faq-title">FAQ</h1>
    <h3>> How do I use this?</h3>
    <p>
      The initial prompts are the only things you need to know to effectively do the encounter:
    </p>
    <ol type="1">
      <li>Where is your statue?</li>
      <li>What shape is your statue holding?</li>
      <li>What shapes are on your wall?</li>
    </ol>
    <p>
      If you and your other fireteam members able to answer those three questions then you are on the right track!
    </p>
    <h3>> Can this explain challenge mode?</h3>
    <p>No.</p>
    <h3>> Can this explain the Fast Strategy?</h3>
    <p>Yes, head over to settings and check the box for <b>fast strategy</b>.</p>
    <h3>> Can I reduce the amount of words per step?</h3>
    <p>Yes, head over to settings and check the box for <b>less-verbose</b></p>
  </div>
</div>
<style>
  h1, h3, p, b, li{
    color: var(--text-color);
  }

  .text-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    padding: 0.25rem;
    margin: 0 2rem;
  }

  .first-section, .second-section {
    text-align: center;
    max-width: 32rem;
  }

  .second-section > h1, h3, p, li {
    text-align: left;
  }

  .about-description {
    text-align: center;
    text-justify: auto; 
    max-width: 32rem;
  }
</style>
