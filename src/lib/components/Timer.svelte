<script>
    import { onMount } from 'svelte';

    let timeLeft = { hours: '00', minutes: '00', seconds: '00' };

    function updateTime() {
        const now = new Date();
        const targetTime = new Date();

        targetTime.setUTCDate(targetTime.getUTCDate() + 1);
        targetTime.setUTCHours(0, 0, 0, 0);

        const diff = targetTime - now;

        let hours = Math.floor(diff / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timeLeft = {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
        };
    }

    onMount(() => {
        updateTime(); 
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="countdown-container">
    <div class="countdown-label">Next operator in</div>
    <div class="countdown-time">
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </div>
    <div class="timezone-info">Time zone: UCT (Midnight at UCT)</div>
    <div class="error-margin-info">*Event times are approximate and may vary by up to one hour.</div>
</div>

<style>
    .error-margin-info{
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #c1c1c1;
        text-align: center; 
        padding: 0 10px;
    }

    .countdown-container {
        background-color: #1b1b1b; 
        color: #fff; 
        font-family: 'Arial', sans-serif; 
        padding: 1.25rem;
        border-radius: 8px; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
  
    .countdown-time {
        font-size: 2.5rem; 
        font-weight: bold; 
        line-height: 1;
        margin: 0;
    }
  
    .countdown-label {
        font-size: 1.5rem;
        text-transform: uppercase; 
        letter-spacing: 2px; 
        margin: 10px 0 5px; 
    }
  
    .timezone-info {
        font-size: 0.8rem;
        color: #a1a1a1; 
    }
</style>
