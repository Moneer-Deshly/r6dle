<script>
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import Timer from "./Timer.svelte";
export let operator;
export let data;
export let averageGuesses;
let userGuesses;

onMount(() => {
    userGuesses = localStorage.getItem("userGuesses");
})
</script>

<div class="success-message" transition:fade>
    <div class="success-content">
    <h2>Gurrr aim!</h2>
    <p>You correctly guessed <span>{operator.name}</span>!</p>
    <img src="opicons/{operator.id}.svg/" alt="" />
    {#if (data.guessers % 10 === 1)}
        <div>You are the <span>{data.guessers}st</span> to guess today's mystery operator correctly!</div>
    {:else if (data.guessers % 10 === 2)}
        <div>You are the <span>{data.guessers}nd</span> to guess today's mystery operator correctly!</div>
    {:else if (data.guessers % 10 === 3)}
        <div>You are the <span>{data.guessers}rd</span> to guess today's mystery operator correctly!</div>
    {:else}
        <div>You are the <span>{data.guessers}th</span> to guess today's mystery operator correctly!</div>
    {/if}
    {#if (userGuesses > Math.round(averageGuesses()))}
        <div>It takes an average of <span>{Math.round(averageGuesses())}</span> tries to guess this operator correctly, whereas it took you <span>{userGuesses}</span> tries! Better luck next time!</div>
    {:else }
        <div>It takes an average of <span>{Math.round(averageGuesses())}</span> tries to guess this operator correctly, whereas it took you <span>{userGuesses}</span> tries! Well done!</div>
    {/if}
    </div>
    <div class="timer"><Timer/></div>
</div>

<style>
span{
    font-weight: bold
}

.success-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 30rem;
    background-color: #1a1a1a;
    color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    z-index: 10;
  }

  .success-message img {
    width: 100px;
    height: 100px;
  }

  .success-message h2 {
    color: #00ff00;
  }

  .success-message p {
    margin: 0.5rem 0;
  }
</style>