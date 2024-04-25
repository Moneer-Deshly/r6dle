<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<script>
	import { quadInOut } from "svelte/easing";
    import About from "./About.svelte";
    import { fly, fade } from "svelte/transition";

    let active = false;

    function toggleDialog(){
        active = !active;
    }
</script>

{#if active}
<div id="backdrop" in:fade={{duration: 300, opacity: 0}} out:fade={{duration: 300}} on:click|self={toggleDialog}></div>
    <div class="dialog">
        <div class="main-container" in:fly={{duration: 300, opacity: 0, y: -300, easing: quadInOut}} out:fly={{duration: 300, y: -300}}>
            <About/>
            <button class="exit-bt" on:click={toggleDialog}>X</button>
        </div>
    </div>
{/if}
<button on:click={toggleDialog}><p>i</p></button>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');

.exit-bt{
    position: absolute;
    top: -1.7rem;
    right: -1.4rem;
    display: grid;
    text-align: center;
    border-radius: 100%;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 2px 2px 2px transparent;
    padding: 0.7rem 1rem;
    width: fit-content;
    background-color: #8c0b0b;
}

#backdrop{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;
  height: 100vh;
  width: 100vw;
  opacity: 0.7;
  z-index: 9999;
}

button{
    margin-top: 0.5rem;
    display: grid;
    text-align: center;
    border-radius: 100%;
    font-size: 1rem;
    border: 1px solid transparent;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    box-shadow: 2px 2px 2px #0D0D0D;
    margin-bottom: 0rem;
    padding: 0.6rem 1rem;
    width: fit-content;
}

p{
    font-family: "Merriweather", serif;
    font-weight: 700;
    font-style: italic;
}

button:hover {
    border-color: #F2F2F2;
}
 
.main-container{
    position: relative;
    border-radius: 8px;
    background-color: #1a1a1a;
    padding: 1rem;
    width: 60em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.dialog{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;
  z-index: 9999;
}
</style>