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
</script>

<main>
    <div class = "informat">
        <h1>Guess today's operator!</h1>
        <p>Begin by typing the name of any operator.</p>
    </div>
    <div class = "game">
        <input on:input={autofill} bind:this={inputField} placeholder="Type operator name..."/>
        <button class = "submit"><i class="fa-solid fa-arrow-right fa"></i></button>
    </div>
    <div class = "dropdown">
        <select id = "select-list">
            {#each matches as option}
                <option value="options">{option.name}</option>
                <img src="opicons/${option.id}.png/">
            {/each}
        </select>
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

select {
    border-radius: 8px;
    margin-top: 0.25em;
    width: 100%;
    height: 3.75rem;
    font-size: 1em;
    padding: 1rem;
}
</style>