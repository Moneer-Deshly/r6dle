<script>
import { activeConfetti } from '$lib/store.js';
import { onMount } from "svelte";
import "../global.css" 
import { v4 as uuidv4 } from "uuid";
import { Confetti } from "svelte-confetti"

onMount(() => {
  if (!localStorage.getItem("userID")) {
    localStorage.setItem("userID", uuidv4());
  }
})
</script>

<main>
  {#if $activeConfetti}
    <div class="confetti"><Confetti x={[-8, 8]} y={[0, 1]} delay={[500, 2000]} duration=3000 amount=550 fallDistance="130vh"/></div>
  {/if}
    <div class = "header">
      <a href="/">R6DLE</a>
    </div>
    <slot/>
</main>
  
<style>
.confetti{
  position: absolute;
  top: -50px;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
}

  a {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.87);
  }
  
  .header {
      font-family: Coolvetica;
      display: flex;
      justify-content: center;
      font-size: 4em;
      line-height: 1.1;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 2px black;
      position: absolute;
      top: 0;
  }
  
  main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  main::before {
    z-index: -1;
    content: "";
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-size: cover;
    background-position: center;
    filter: blur(2px);
    opacity: 0.5;
    background-image: url("/rainbow-six-siege-operators.jpg");
  }
</style>