<script>
import r6operators, { alibi, doc, getSVGIcon } from "r6operators"

let found = true

let inputField

let matches = []

let rawOperators = Object.entries(r6operators).map(element => {  
    return element[1]
});

function autofill() {
    found = true
    let userInput = inputField.value.toLowerCase()
    matches = []
    if (userInput.length === 0) {
        return
    }
    for (let i = 0; i < rawOperators.length; i++) {
        if (rawOperators[i].name.toLowerCase().startsWith(userInput, 0)) {
            matches.push(rawOperators[i])
        }
    }
    if (matches.length === 0) {
        found = false
    }
}

function guess() {
    console.log(`You have guessed ${inputField.value}!`)
}

function selectOption(optionName) {
    inputField.value = optionName;
    guess();
}
</script>

<main>
    <div class = "informat">
        <h1>Guess today's operator!</h1>
        <p>Begin by typing the name of any operator.</p>
    </div>
    <div class = "game">
        <input on:input={autofill} bind:this={inputField} placeholder="Type operator name..."/>
        <button on:click={guess} class = "submit"><i class="fa-solid fa-arrow-right fa"></i></button>
    </div>
    <div class = "dropdown">
        <div id = "select-list" class={matches.length > 0 ? '' : 'hidden'}>
            {#each matches as option}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="operator-container" on:click={() => selectOption(option.name.toLowerCase())}>
                    <div class="operator">{option.name}</div>
                    <img class="operator-image" src="opicons/{option.id}.svg/" alt="">
                </div>
            {/each}
        </div>
        {#if (!found)}
        <div>
            No operators found.
        </div>
        {/if}
    </div>
</main>

<style>
.informat {
    font-size: 1rem;
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

input {
    padding: 1.2rem;
    font-size: 1.25em;
    border-radius: 1rem;
    border: 1rem;
    background-color: #1a1a1a;
}

.game {
    display: flex;
    align-items: center;
    gap: 0.4em;
}

.submit {
    padding: 0.75rem 0rem;
    width: 3.75rem;
    height: 3.75rem;
    font-size: 1em;
    border-radius: 50%;
    margin-bottom: 0rem;
}

.operator-container {
    display: flex;
    align-items: center; 
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
}

.operator-container:hover{
    transition: 0.1s;
    background-color: #333333;
}

#select-list {
    max-height: 16.5rem;
    width: 22rem;
    position: fixed;
    margin-top: 0.2em;
    background-color: #1a1a1a; 
    padding: 0.5rem; 
    border-radius: 16px; 
    box-sizing: border-box;
    overflow-y: auto;
}

.hidden {
    display: none;
}

img {
    width: 40px;
    height: 40px;
}

#select-list::-webkit-scrollbar-track {
    background-color: #2e2e2e; 
    border-radius: 10px; 
}

#select-list::-webkit-scrollbar-thumb {
    background-color: #565656; 
    border-radius: 10px; 
    border: 3px solid #2e2e2e; 
}

#select-list::-webkit-scrollbar-thumb:hover {
    background-color: #6E6E6E;
}

#select-list::-webkit-scrollbar {
    width: 1.1rem;
}
</style>