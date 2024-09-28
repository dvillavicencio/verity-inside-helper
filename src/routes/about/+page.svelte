<script>
import { ExternalLink } from "lucide-svelte";

const resources = [
  { label: "Dissection Calculator by Yugnar", link: "https://yugnar.github.io/verityCalculator/verityCalculator/"},
  { label: "Verity Calculator & Simulator by Jimsalad#9255", link: "https://verity.d2atlas.com/"}
]
</script>

<div class="text-container">
  <div class="first-section">
    <h1>What is this?</h1>
    <p class="about-description">
    This is a small web-tool that should help Destiny 2 players figure out the inside portion of the Verity encounter on Salvation's Edge.
    I have ran this encounter quite a bit myself to feel confident on making a small tool for inexperienced players to at least get an idea of what's going on.
    Additionally, you can click/tap on each of the steps to mark it off, this was a small feature I thought might be useful for playes in case they forgot
    which step they are on. And yeah, I'm aware there's other tools like this out there, but I wanted to make my own.
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
      <li>Who has double shapes on their wall? <b><u>(fast strategy only)</u></b></li>
    </ol>
    <p>
      If you and your other fireteam members able to answer those three questions then you are on the right track!
      If you want to try the fast stategy with your fireteam there's a toggle button at the very top
      so that the app explains the steps for it.
    </p>
    <h3>> Can this tool explain challenge mode?</h3>
    <p>Not yet</p>
    <h3>> Can this tool explain the fast-strategy?</h3>
    <p>Yes it can, like said above, click on the hamburger menu and check the <i>fast strategy</i> toggle</p>
    <h3>> What is the Normal/LFG strategy in Verity?</h3>
    <p>The normal strategy that's done by the vast majority of LFG fireteams consists of three simple steps:</p>
    <ol>
      <li>Double up each others' shapes</li>
      <li>Distribute your shapes to the other two people</li>
      <li>Pick up both shapes and GTFO</li>
    </ol>
    <h3>> What is the Fast Strategy in Verity?</h3>
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
    <h3>> Are there other resources available to learn this encounter?</h3>
    <p>Yes there are, here I'll link some that have helped me and that are also very cool:</p>
    <ul>
      {#each resources as resource} 
        <li><a href={resource.link} target="_blank">{resource.label} <ExternalLink size={16}/></a></li>  
      {/each}
    </ul>
  </div>
</div>
<style>
  h1, h3, p, b, li, a {
    color: var(--text-color);
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.1rem;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h3 {
    font-size: 1rem;
  }

  p, li {
    font-size: 0.9rem;
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
