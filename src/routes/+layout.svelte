<script>
import "../global.css" 

</script>

<main>
    <div class = "header">
      <a href="/">R6DLE</a>
    </div>
    <slot/>
  </main>
  
  <style>
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