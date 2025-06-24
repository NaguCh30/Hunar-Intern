window.addEventListener("DOMContentLoaded", renderHistory);

function BMICalc() {
  const height = getInputValue('height');
  const weight = getInputValue('weight');
  const errorMessage = document.getElementById('error-message');

  if (!validateInputs(height, weight)) {
    errorMessage.textContent = " Please enter valid numeric values for height and weight.";
    return;
  }

  errorMessage.textContent = "";
  const bmi = calculateBMI(weight, height);
  const category = getBMICategory(bmi);
  saveToHistory(bmi, category);
  renderHistory();
  showResultInBox1(bmi, category);
  showHighlightInBox2(category);
}

function getInputValue(id) {
  return parseFloat(document.getElementById(id).value);
}

function validateInputs(height, weight) {
  return height && weight && !isNaN(height) && !isNaN(weight);
}

function calculateBMI(weight, height) {
  return ((weight * 10000) / (height * height)).toFixed(1);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  else if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
  else if (bmi >= 25 && bmi <= 29.9) return "Overweight";
  else if (bmi >= 30 && bmi <= 34.9) return "Obese (Class 1)";
  else if (bmi >= 35 && bmi <= 39.9) return "Obese (Class 2)";
  else return "Obese (Class 3 / Extreme Obesity)";
}

function showResultInBox1(bmi, category) {
  const box1 = document.querySelector('.box-1');
  const oldResult = document.querySelector('.result-area');
  if (oldResult) oldResult.remove();

  const div = document.createElement('div');
  div.classList.add('result-area');

  const descriptions = {
    "Underweight": "You are underweight",
    "Normal weight": "You are at a healthy weight",
    "Overweight": "You are slightly overweight",
    "Obese (Class 1)": "You are in Obesity Class 1",
    "Obese (Class 2)": "You are in Obesity Class 2",
    "Obese (Class 3 / Extreme Obesity)": "You are in Obesity Class 3 (Severe Obesity)"
  };

  const advices = {
    "Underweight": "This may indicate poor nutrition or underlying health issues. Consider increasing calorie intake and consult a healthcare provider.",
    "Normal weight": "Keep it up with a balanced diet and regular physical activity to maintain your wellness.",
    "Overweight": "Consider reviewing your eating and exercise habits to lower your risk of future health problems.",
    "Obese (Class 1)": "Taking action now—like improving diet and increasing physical activity—can greatly benefit your health.",
    "Obese (Class 2)": "It’s advisable to work with healthcare professionals to manage your weight and prevent complications.",
    "Obese (Class 3 / Extreme Obesity)": "This significantly increases the risk of serious health conditions. Medical support is strongly recommended."
  };

  div.innerHTML = `
    <h2>${category}</h2>
    <b>Your BMI = ${bmi}</b>
    <h3>${descriptions[category]}</h3>
    <p>${advices[category]}</p>
  `;

  box1.appendChild(div);
}

function showHighlightInBox2(category) {
  const box2 = document.querySelector('.box-2');
  const oldHighlight = document.querySelector('.highlight');
  if (oldHighlight) oldHighlight.remove();

  const highlightDiv = document.createElement('div');
  highlightDiv.classList.add('highlight');
  highlightDiv.innerHTML = `<h1>${category}</h1>`;
  box2.appendChild(highlightDiv);

  const categoryColors = {
    "Underweight": "rgba(79, 195, 247, 0.3)",
    "Normal weight": "rgba(10, 165, 17, 0.3)",
    "Overweight": "rgba(232, 105, 32, 0.3)",
    "Obese (Class 1)": "rgba(239, 83, 80, 0.3)",
    "Obese (Class 2)": "rgba(213, 12, 12, 0.3)",
    "Obese (Class 3 / Extreme Obesity)": "rgba(250, 4, 4, 0.3)"
  };
  const solidCategoryColors = {
    "Underweight": "rgb(79, 195, 247)",
    "Normal weight": "rgb(102, 187, 106)",
    "Overweight": "rgb(215, 106, 10)",
    "Obese (Class 1)": "rgb(219, 15, 12)",
    "Obese (Class 2)": "rgb(233, 4, 0)",
    "Obese (Class 3 / Extreme Obesity)": "rgb(255, 0, 0)"
  };

  box2.style.backgroundColor = categoryColors[category] || "rgba(255,255,255,0.4)";
  box2.highlightDiv.style.backgroundColor = solidCategoryColors[category] || "rgba(0, 0, 0, 0.2)";
}

function saveToHistory(bmi, category) {
  const date = new Date().toLocaleString();  // readable timestamp
  const newRecord = { bmi, category, date };
  let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  history.push(newRecord);
  localStorage.setItem("bmiHistory", JSON.stringify(history));
}

function renderHistory() {
  const box3 = document.querySelector(".box-3");
  box3.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  let historyWrapper = document.createElement("div");
  historyWrapper.classList.add("history-wrapper");
  history.forEach(record => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `
      <p><b>${record.category}</b> - BMI: ${record.bmi}</p>
      <small>${record.date}</small>
    `;
    historyWrapper.appendChild(historyItem);
  });

  box3.appendChild(historyWrapper);

  // Add "Clear" button
  let clrBtnContainer = document.createElement('div');
  clrBtnContainer.classList.add('clear-button-container');

  let button = document.createElement('button');
  button.classList.add('clear-button');
  button.textContent = 'Clear History';
  button.onclick = clearHistory;

  clrBtnContainer.appendChild(button);
  box3.appendChild(clrBtnContainer);
}

function clearHistory() {
  const box3 = document.querySelector('.box-3');
  box3.style.transition = "opacity 0.3s ease";
  box3.style.opacity = "0";

  setTimeout(() => {
    localStorage.removeItem("bmiHistory");
    renderHistory();
    box3.style.opacity = "1";
  }, 300);
}