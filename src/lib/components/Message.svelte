<script>
    import About from "./About.svelte";

    let dialog

    function toggleDialog(){
        if (!dialog.open){
            dialog.showModal();
        } else {
            dialog.close();
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click|self={toggleDialog}>
    <div class="main-container">
        <About/>
    </div>
</dialog>
<button on:click={toggleDialog}><p>i</p></button>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');

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

dialog::backdrop {
    background-color: black;
    opacity: 0.7;
}
 
.main-container{
    padding: 1rem;
    width: 60em;
    display: flex;
    align-items: center;
    justify-content: center;
}

dialog{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;
}
</style>