<script>
    // @ts-nocheck
    
    import r6operators, { alibi, doc, getSVGIcon, recruit_blue, recruit_green, recruit_orange, recruit_red, recruit_yellow } from "r6operators";
    import { fade } from "svelte/transition";
    import {flip} from "svelte/animate"
    
    let found = true;
    let matches = [];
    let inputField;
    let guessedOnce = false;
    let guessedOperator;
    let sameGender;
    let sameRole;
    let sameOrg;
    let sameCountry;
    let sameHealth;
    let sameSpeed;
    let sameSeason;
    let hide = false;
    let allGuesses = [];
    
    /**
     * Returns all the operators in an object.
     */
    let rawOperators = Object.entries(r6operators).map(element => {  
        return element[1]
    });
    
    let rawOperatorsList = []
    
    /**
     * Makes a list of all the operators.
     */
    let rawOperatorsListMaker = Object.entries(rawOperators).forEach(element => {
        rawOperatorsList.push(element[1]);
    });
    
    /**
     * Removes other recruit versions.
    */
    rawOperatorsList = rawOperatorsList.filter(element => {
        return element.id != "recruit_green" && element.id != "recruit_orange" && element.id != "recruit_yellow" && element.id != "recruit_red" && element.id != "recruit_blue";
    });
    
    function getRandomOp() {
        let random = Math.floor(Math.random() * rawOperatorsList.length);
        return rawOperatorsList[random];
    }
    
    let todaysOperator = getRandomOp();
    
    // FOR TESTING, REMOVE WHEN DONE
    console.log(todaysOperator)
    
    function autofill() {
        found = true
        let userInput = inputField.value.toLowerCase()
        matches = []
        if (userInput.length === 0) {
            return
        }
        for (let i = 0; i < rawOperatorsList.length; i++) {
            if (rawOperatorsList[i].id.startsWith(userInput, 0)) {
                matches.push(rawOperatorsList[i])
            }
        }
        if (matches.length === 0) {
            found = false
        }
    }
    
    function handleSubmitByEnter(event){
        if (matches.length != 0){
            if (event.key === 'Enter' && inputField.value.length > 0){
                selectOption(matches[0].id);
            }
        }
    }
    
    function guess() {
        hide = true;
        guessedOnce = true;
        guessedOperator = rawOperatorsList.find(element => {return inputField.value.toLowerCase() === element.id.toLowerCase()});
        let sameID = guessedOperator.id.toLowerCase() === todaysOperator.id.toLowerCase();
        sameGender = guessedOperator.meta.gender.toUpperCase() === todaysOperator.meta.gender.toUpperCase();
        sameRole = guessedOperator.role === todaysOperator.role;
        sameOrg = guessedOperator.org === todaysOperator.org;
        sameCountry = parseCountry(guessedOperator) === parseCountry(todaysOperator);
        sameHealth = guessedOperator.ratings.health === todaysOperator.ratings.health;
        sameSpeed = guessedOperator.ratings.speed === todaysOperator.ratings.speed;
        sameSeason = guessedOperator.meta.season === todaysOperator.meta.season;
    
        if (sameID) {
            console.log(`You have correctly guessed ${todaysOperator.name}!`);
        }
    
        allGuesses = [{
            guessedOperator: guessedOperator,
            sameGender: sameGender,
            sameRole: sameRole,
            sameOrg: sameOrg,
            sameCountry: sameCountry,
            sameHealth: sameHealth,
            sameSpeed: sameSpeed,
            sameSeason: sameSeason
        }, ...allGuesses];
    
    
        removeOperator(guessedOperator.id);
        inputField.value = "";
    }
    
    function selectOption(optionName) {
        inputField.value = optionName;
        guess();
    }
    
    function removeOperator(operator) {
        rawOperatorsList = rawOperatorsList.filter(element => {
            return element.id != `${operator}`;
        });
    }
    
    function parseCountry(operator) {
        const array = operator.bio.birthplace.split(", ");
        if ((array[array.length - 1]) === "Nederlands") {
            array[array.length - 1] = "Netherlands";
        }
        return array[array.length - 1];
    }
    </script>
    
    <div class = "classic-container">
        <div class = "informat">
            <h1>Guess today's operator!</h1>
            <p>Begin by typing the name of any operator.</p>
        </div>
        <div class = "game">
            <div class="game-with-no-ops-found">
                <div class="pure-game">
                    <input on:input={autofill} bind:this={inputField} placeholder="Type operator name..." tabindex="0" on:keyup={handleSubmitByEnter}/>
                    <button on:click={guess} class = "submit"><i class="fa-solid fa-arrow-right fa"></i></button>
                </div>
                {#if (!found)}
                    <div class="not-found">
                        No operators found.
                    </div>
                {:else}
                    <div></div>
                {/if}
            </div>
            <div id = "select-list" class={matches.length > 0 && !hide ? '' : 'hidden'}>
                {#each matches as option}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="operator-container" on:click={() => selectOption(option.id.toLowerCase())}>
                        <div class="operator">{option.name}</div>
                        <img class="operator-image" src="opicons/{option.id}.svg/" alt="">
                    </div>
                {/each}
            </div>
        </div>
        <div class="hidden">{hide = false}</div>
        {#if guessedOnce}
        <div class="description-container">
            <div>Operator</div>
            <div>Gender</div>
            <div>Role</div>
            <div>Org</div>
            <div>Country</div>
            <div>Health</div>
            <div>Speed</div>
            <div>Season</div>
        </div>
        {/if}
        <div class="game-container">
            {#each allGuesses as guess (guess.guessedOperator.id)} 
                <div class="operator-description-container">
                    <div class="square-image" in:fade={{ key:guess.guessedOperator.id }}><img class="guessedOperator-image" src="opicons/{guess.guessedOperator.id}.svg/" alt=""></div>
                    <div class="square-gender" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 500 }} class:correct={guess.sameGender} class:wrong={!guess.sameGender}>
                        <div class="guessedOperator-gender">
                            {#if guess.guessedOperator.meta.gender.toUpperCase() === "M"}
                                Male
                            {:else if guess.guessedOperator.meta.gender.toUpperCase() === "F"}
                                Female
                            {:else}
                                Other
                            {/if}
                        </div>
                    </div>
                    <div class="square-role" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 1000 }} class:correct={guess.sameRole} class:wrong={!guess.sameRole}>{guess.guessedOperator.role}</div>
                    <div class="square-org" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 1500 }} class:correct={guess.sameOrg} class:wrong={!guess.sameOrg}>{guess.guessedOperator.org}</div>
                    <div class="square-country" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 2000 }} class:correct={guess.sameCountry} class:wrong={!guess.sameCountry}>{parseCountry(guess.guessedOperator)}</div>
                    <div class="square-health" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 2500 }} class:correct={guess.sameHealth} class:wrong={!guess.sameHealth}>{guess.guessedOperator.ratings.health}</div>
                    <div class="square-speed" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 3000 }} class:correct={guess.sameSpeed} class:wrong={!guess.sameSpeed}>{guess.guessedOperator.ratings.speed}</div>
                    <div class="square-season" in:fade={{ duration: 500, key:guess.guessedOperator.id, delay: 3500 }} class:correct={guess.sameSeason} class:wrong={!guess.sameSeason}>{guess.guessedOperator.meta.season}</div>
                </div>
            {/each}
        </div>
    </div>
    
    <style>
    .game-with-no-ops-found{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
    }
    
    .pure-game{
        margin-bottom: 0.7rem;
    }
    
    .not-found{
        font-size: 1.1rem;
        max-height: 16.5rem;
        width: 22rem;
        position: absolute;
        background-color: #1a1a1a; 
        padding: 1.25rem; 
        border-radius: 16px; 
        box-sizing: border-box;
        overflow-y: auto;
        left: 0;
        top: 70px;
    }
    
    .classic-container{
        display: grid;
        place-items: center;
        gap: 1rem;
    }
    
    .guessedOperator-image{
        width: 5rem;
        height: 5rem;
    }
    
    .game-container > div{
        font-size: 1.2rem;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(8, minmax(0, 140px));
    }
    
    .correct{
        background-color: green;
    }
    
    .wrong{
        background-color: #8c0b0b;
    }
    
    .operator-description-container{
        margin-bottom: 0.5rem;
    }
    
    .description-container{
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(8, minmax(0, 140px));
    }
    
    .description-container, .operator-description-container > *{
        width: 100%;
        text-align: center;
    }
    
    [class^="square-"]:not(.square-image) {
        width: 97.5%;
        height: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        cursor: default;
        text-shadow: 0 0 3px #000;
        box-shadow: inset 0 0 6px #ffffff;
        border-radius: 8px;
    }
    
    .informat {
        margin-top: 2rem;
        width: max-content;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .game-container {
        height: calc(100vh - 22rem);
        overflow-x: hidden;
        overflow-y: auto;
    }
    
    .game {
        display: flex;
        align-items: center;
        gap: 0.4em;
        position: relative;
    }
    
    input {
        padding: 1.2rem;
        font-size: 1.25em;
        border-radius: 1rem;
        border: 1rem;
        background-color: #1a1a1a;
        transition: border-color 0.25s;
        box-shadow: 2px 2px 2px #0D0D0D;
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
        position: absolute;
        background-color: #1a1a1a; 
        padding: 0.5rem; 
        border-radius: 16px; 
        box-sizing: border-box;
        overflow-y: auto;
        left: 0;
        top: 70px;
        z-index: 999;
    }
    
    .hidden {
        display: none;
    }
    
    .operator-image{
        width: 40px;
        height: 40px;
    }
    
    #select-list::-webkit-scrollbar-track, .game-container::-webkit-scrollbar-track {
        background-color: #2e2e2e; 
        border-radius: 10px; 
    }
    
    #select-list::-webkit-scrollbar-thumb, .game-container::-webkit-scrollbar-thumb {
        background-color: #565656; 
        border-radius: 10px; 
        border: 3px solid #2e2e2e; 
    }
    
    #select-list::-webkit-scrollbar-thumb:hover, .game-container::-webkit-scrollbar-thumb:hover {
        background-color: #6E6E6E;
    }
    
    #select-list::-webkit-scrollbar, .game-container::-webkit-scrollbar {
        width: 1.1rem;
    }
    </style>