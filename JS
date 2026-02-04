// Grab elements safely (works everywhere, including GitHub Pages)
const sunlight = document.getElementById("sunlight");
const producers = document.getElementById("producers");
const primary = document.getElementById("primary");
const secondary = document.getElementById("secondary");

const sunVal = document.getElementById("sunVal");
const prodVal = document.getElementById("prodVal");
const primVal = document.getElementById("primVal");
const secVal = document.getElementById("secVal");

const statusBox = document.getElementById("statusBox");
const reasoning = document.getElementById("reasoning");

const eliminateChoice = document.getElementById("eliminateChoice");
const studentPrediction = document.getElementById("studentPrediction");
const eliminationFeedback = document.getElementById("eliminationFeedback");

const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

const sliders = document.querySelectorAll("input[type='range']");

sliders.forEach(slider => {
  slider.addEventListener("input", updateEcosystem);
});

checkBtn.addEventListener("click", checkElimination);
resetBtn.addEventListener("click", resetEcosystem);

function updateEcosystem() {
  const sunlightValue = sunlightVal();
  const producersValue = producersVal();
  const primaryValue = primaryVal();
  const secondaryValue = secondaryVal();

  updateLabels();

  let reasons = [];

  if (sunlightValue < 30) {
    reasons.push("There is not enough sunlight for producers to make food.");
  }
  if (producersValue < 30) {
    reasons.push("Too few producers means not enough energy enters the ecosystem.");
  }
  if (primaryValue > producersValue) {
    reasons.push("There are more primary consumers than available producers.");
  }
  if (secondaryValue > primaryValue) {
    reasons.push("Secondary consumers do not have enough prey to survive.");
  }

  if (reasons.length > 0) {
    statusBox.innerText = "Unstable ❌";
    statusBox.style.backgroundColor = "#fab1a0";
    reasoning.innerHTML = "<strong>Why?</strong><br>" + reasons.join("<br>");
  } else {
    statusBox.innerText = "Stable ✅";
    statusBox.style.backgroundColor = "#a8e6a3";
    reasoning.innerText = "Energy is flowing normally through the food chain.";
  }
}

function updateLabels() {
  sunVal.innerText = sunlightVal();
  prodVal.innerText = producersVal();
  primVal.innerText = primaryVal();
  secVal.innerText = secondaryVal();
}

function sunlightVal() { return +sunlight.value; }
function producersVal() { return +producers.value; }
function primaryVal() { return +primary.value; }
function secondaryVal() { return +secondary.value; }

// ELIMINATION ACTIVITY
function checkElimination() {
  const choice = eliminateChoice.value;

  if (!choice) {
    eliminationFeedback.innerText = "Please select an organism to eliminate.";
    return;
  }

  if (choice === "producer") {
    eliminationFeedback.innerHTML =
      "✅ <strong>Correct Explanation:</strong> Without producers, energy cannot enter the ecosystem. All consumers will eventually die.";
  }

  if (choice === "primary") {
    eliminationFeedback.innerHTML =
      "✅ <strong>Correct Explanation:</strong> Producers may increase, but secondary consumers will lose their food source and decline.";
  }

  if (choice === "secondary") {
    eliminationFeedback.innerHTML =
      "✅ <strong>Correct Explanation:</strong> Primary consumers may increase, which can lead to overconsumption of producers.";
  }
}

function resetEcosystem() {
  sunlight.value = 70;
  producers.value = 70;
  primary.value = 50;
  secondary.value = 30;
  reasoning.innerText = "";
  eliminationFeedback.innerText = "";
  studentPrediction.value = "";
  eliminateChoice.value = "";
  updateEcosystem();
}

updateEcosystem();

