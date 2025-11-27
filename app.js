// app.js

let selectedMood = null;

// ✅ Your deployed backend on Render
const API_BASE = "https://bite-by-vibe-backend.onrender.com";

const moodButtons = document.querySelectorAll(".mood-btn");
const spinBtn = document.getElementById("spin-btn");
const wheel = document.getElementById("wheel");

const showMood = document.getElementById("show-mood");
const showRecipe = document.getElementById("show-recipe");

// Handle mood selection
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active from all
    moodButtons.forEach(b => b.classList.remove("active"));
    // add active on clicked
    btn.classList.add("active");

    // mood slug for backend
    selectedMood = btn.dataset.mood;

    // prettier label for user
    showMood.textContent = btn.innerText;

    // reset recipe until spin happens
    showRecipe.textContent = "---";
  });
});

// Handle spin
spinBtn.addEventListener("click", async () => {
  if (!selectedMood) {
    alert("Pick a mood first!");
    return;
  }

  // start spin animation
  wheel.classList.add("spinning");
  showRecipe.textContent = "Spinning... 🍽️";

  // wait while it "spins"
  setTimeout(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/recipe?mood=${encodeURIComponent(selectedMood)}`
      );
      const data = await res.json();

      if (data.recipe) {
        showRecipe.textContent = data.recipe;
      } else {
        showRecipe.textContent = "No recipe found 😢";
      }
    } catch (err) {
      showRecipe.textContent = "Server not responding 😢";
    }

    wheel.classList.remove("spinning");
  }, 3000);
});
