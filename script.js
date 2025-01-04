document.addEventListener('DOMContentLoaded', function () {
    // Initialize Vanta.js Background
    VANTA.FOG({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 800.00,
        minWidth: 800.00,
        highlightColor: 0xc31432,
        midtoneColor: 0x240b36,
        lowlightColor: 0x2900ff,
        baseColor: 0x000000,
    });

    // Initialize Flatpickr
    flatpickr("#deadline", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        theme: "dark"
    });
});

const jsConfetti = new JSConfetti(); // Initialize js-confetti

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const inputSection = document.getElementById("input-section");
const timerSection = document.getElementById("timer-section");
const motivationalText = document.getElementById("motivational-text");

const dayElem = document.getElementById("day");
const hourElem = document.getElementById("hour");
const minElem = document.getElementById("min");
const secElem = document.getElementById("sec");
const deadlineInput = document.getElementById("deadline");

let countdownInterval;

// Start Countdown Button
startBtn.addEventListener("click", () => {
    const deadlineValue = deadlineInput.value;

    if (!deadlineValue) {
        alert("Please select a deadline!");
        return;
    }

    const deadline = new Date(deadlineValue).getTime();
    const now = new Date().getTime();

    if (deadline <= now) {
        alert("Deadline must be in the future!");
        return;
    }

    inputSection.classList.add("hidden");
    timerSection.classList.remove("hidden");

    motivationalText.textContent = "Every second counts,Make this hackathon legendary!";
    startCountdown(deadline);
});

// Countdown Timer Logic
function startCountdown(deadline) {
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = deadline - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            motivationalText.textContent = "Congratulations! Time's up. 🎉";

            // Trigger Confetti Explosion
            jsConfetti.addConfetti();

            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        dayElem.textContent = days.toString().padStart(2, "0");
        hourElem.textContent = hours.toString().padStart(2, "0");
        minElem.textContent = minutes.toString().padStart(2, "0");
        secElem.textContent = seconds.toString().padStart(2, "0");
    }, 1000);
}

// Reset Button Logic
resetBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    inputSection.classList.remove("hidden");
    timerSection.classList.add("hidden");

    dayElem.textContent = "00";
    hourElem.textContent = "00";
    minElem.textContent = "00";
    secElem.textContent = "00";
    deadlineInput.value = "";

    motivationalText.textContent = "";
});
