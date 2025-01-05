document.addEventListener('DOMContentLoaded', function () {
    // Flatpickr Initialization
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#deadline", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
        });
    } 

    const jsConfetti = typeof JSConfetti !== 'undefined' ? new JSConfetti() : null;
   

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

    // Utility Functions
    const loadDeadline = () => {
        const savedDeadline = localStorage.getItem("deadline");
        return savedDeadline ? new Date(savedDeadline).getTime() : null;
    };

    const saveDeadline = (deadline) => {
        localStorage.setItem("deadline", new Date(deadline).toISOString());
    };

    const clearDeadline = () => {
        localStorage.removeItem("deadline");
    };

    const startCountdown = (deadline) => {
        clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeRemaining = deadline - now;

            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                clearDeadline();
                motivationalText.textContent = "Congratulations! Time's up. 🎉";

                if (jsConfetti) jsConfetti.addConfetti();

                dayElem.textContent = "00";
                hourElem.textContent = "00";
                minElem.textContent = "00";
                secElem.textContent = "00";
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
    };

    // Start Countdown Button Logic
    if (startBtn) {
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

            saveDeadline(deadline);

            inputSection.classList.add("hidden");
            timerSection.classList.remove("hidden");

            motivationalText.textContent = "Every second counts, make this hackathon legendary!";
            startCountdown(deadline);
        });
    }

    // Reset Button Logic
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            clearInterval(countdownInterval);
            clearDeadline();
            inputSection.classList.remove("hidden");
            timerSection.classList.add("hidden");

            dayElem.textContent = "00";
            hourElem.textContent = "00";
            minElem.textContent = "00";
            secElem.textContent = "00";
            deadlineInput.value = "";

            motivationalText.textContent = "";
        });
    }

    // Resume Countdown on Page Load
    const savedDeadline = loadDeadline();
    if (savedDeadline) {
        const now = new Date().getTime();

        if (savedDeadline > now) {
            inputSection.classList.add("hidden");
            timerSection.classList.remove("hidden");
            motivationalText.textContent = "Every second counts, make this hackathon legendary!";
            startCountdown(savedDeadline);
        } else {
            clearDeadline();
        }
    }
});
