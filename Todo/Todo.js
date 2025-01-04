document.addEventListener('DOMContentLoaded', function () {
  // Initialize Vanta.js Background
  VANTA.FOG({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 1000.00,
      minWidth: 100.00,
      highlightColor: 0xc31432,
      midtoneColor: 0x240b36,
      lowlightColor: 0x2900ff,
      baseColor: 0x000000,
  });
});
document.addEventListener("DOMContentLoaded", () => {
  
    const goalContainerWrapper = document.querySelector(".goal-countainer-wrapper");
    const errorLabel = document.querySelector(".error-label");
    const progressLabel = document.querySelector(".progress-label");
    const progressValue = document.querySelector(".progress-value");
    const addButton = document.querySelector(".add");
    const deleteButton = document.querySelector(".remove");
  

    let allGoals = JSON.parse(localStorage.getItem("allGoals")) || [];
  
    const quote = [
      "Raise the bar by completing your goals!",
      "Well Begun is half done!",
      "Just a step away, keep going!",
      "Woha! You just completed all goals, It's time to chill 🎉",
    ];
  
   
    function updateProgress() {
      const totalGoals = allGoals.length;
      const completedGoals = allGoals.filter((goal) => goal.completed).length;
  
      progressValue.style.width = `${(completedGoals / totalGoals) * 100 || 0}%`;
      progressValue.innerText = `${completedGoals}/${totalGoals} Completed`;
      progressLabel.innerText = quote[Math.min(completedGoals, quote.length - 1)];
    }
  
   
    function renderGoals() {
      if (!goalContainerWrapper) {
        console.error('goalContainerWrapper is null');
        return;
      }
  
      goalContainerWrapper.innerHTML = "";
  
      allGoals.forEach((goal, index) => {
        const goalDiv = document.createElement("div");
        goalDiv.classList.add("goal-container");
        if (goal.completed) goalDiv.classList.add("completed");
  
        goalDiv.innerHTML = `
          <div class="custom-checkbox" data-index="${index}">
            <svg class="check-icon" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.11111L3.20098 7.12635C3.54481 7.59737 4.21708 7.67546 4.65973 7.29581L12 1" stroke="#A30048" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <input type="text" class="goal-input" value="${goal.name}" placeholder="Add a Goal" data-index="${index}" ${goal.completed ? 'disabled' : ''}>
        `;
        goalContainerWrapper.appendChild(goalDiv);
      });
  
      attachEventListeners();
    }
  
   
    function addGoal() {
      allGoals.push({ name: "", completed: false });
      localStorage.setItem("allGoals", JSON.stringify(allGoals)); 
      renderGoals(); 
      updateProgress(); 
    }
  
  
    function removeLastGoal() {
      if (allGoals.length === 0) {
        errorLabel.innerText = "No goals to remove!";
        errorLabel.style.display = "block";
        return;
      }
      errorLabel.style.display = "none";
      allGoals.pop(); 
      localStorage.setItem("allGoals", JSON.stringify(allGoals)); 
      renderGoals(); 
      updateProgress(); 
    }
  
   
    function attachEventListeners() {
      const checkboxes = document.querySelectorAll(".custom-checkbox");
      const inputs = document.querySelectorAll(".goal-input");
  
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
          const index = checkbox.dataset.index;
          const input = inputs[index]; 
  
        
          allGoals[index].completed = !allGoals[index].completed;
  
         
          input.disabled = allGoals[index].completed;
  
     
          localStorage.setItem("allGoals", JSON.stringify(allGoals));
  
          renderGoals(); 
          updateProgress();
        });
      });
  
      inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
          const index = e.target.dataset.index;
          allGoals[index].name = e.target.value.trim();
          localStorage.setItem("allGoals", JSON.stringify(allGoals));
        });
      });
    }
  

    addButton.addEventListener("click", addGoal);
    deleteButton.addEventListener("click", removeLastGoal);
  
  
    renderGoals();
    updateProgress();
  });
  