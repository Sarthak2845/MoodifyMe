document.addEventListener('DOMContentLoaded', function () {
    VANTA.FOG({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xc31432,
        midtoneColor: 0x240b36,
        lowlightColor: 0x2900ff,
        baseColor: 0x000000,
    });
});

const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const deadline = document.querySelector('.deadline');
const btn = document.querySelector('.btn');

let timerInterval; 

btn.addEventListener('click', () => {
    const deadlineValue = new Date(deadline.value);

    if (isNaN(deadlineValue.getTime())) {
        alert('Please enter a valid date and time!');
        return;
    }
    if (deadlineValue <= new Date()) {
        alert('Deadline must be in the future!');
        return;
    }

    clearInterval(timerInterval);

    const updateTimer = () => {
        const currentTime = new Date();
        const remainingTime = deadlineValue - currentTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
            day.textContent = hour.textContent = min.textContent = sec.textContent = '00';
            alert('Countdown finished!');
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        day.textContent = String(days).padStart(2, '0');
        hour.textContent = String(hours).padStart(2, '0');
        min.textContent = String(minutes).padStart(2, '0');
        sec.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
});