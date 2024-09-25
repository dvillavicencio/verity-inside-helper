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
    <h3>> Can this tool explain challenge mode?</h3>
    <p>Not yet</p>
    <h3>> Can this tool explain the fast-strategy?</h3>
    <p>Yes it can, click on the hamburger menu and check the <i>fast strategy</i> toggle</p>
    <h3>> What is the fast-strategy in Verity?</h3>
    <p>
      The fast-strategy in Verity is just another way of completing the puzzle in which all the three people that are inside the rooms
      <b>only pass their shapes twice</b>. For this specific strategy there's three possible scenarios that can happen and on each one
      guardians will be doing slightly different actions depending on their statue and the shapes they have up on their wall.
      The three scenarios that can happen are:</p>
      <ol type="1">
        <li>All guardians have double shapes on their wall</li> 
        <li>Only one guardian has double shapes on their wall and the two others don't</li>
        <li>None of the guardians have double shapes on their wall</li>
      </ol>
    <p>
      Regardless of this, the fast-strategy guarantess you'll only pass your shapes <b>twice</b>, only killing one ogre and one set of knights if done properly
    </p>
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
