const ADVICE_QUOTE_API_URL = "https://api.adviceslip.com/advice";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const inputDisplay = document.getElementById("inputDisplay");
const minutesTimer = document.querySelector(".minuteTimer");
const secondsTimer = document.querySelector(".secondsTimer");
const btnTimer = document.querySelector(".btnTimer");

inputDisplay.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = inputDisplay.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) renderNewQuote();
});

function getAdviceQuote() {
  return fetch(ADVICE_QUOTE_API_URL)
    .then((respond) => respond.json())
    .then((data) => data.slip.advice);
}

async function renderNewQuote() {
  const quote = await getAdviceQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  inputDisplay.value = null;
  startTimer();
}

renderNewQuote();

let startTime;
function startTimer() {
  secondsTimer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    secondsTimer.innerText = getTimerTime();
  }, 1000);
}
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

window.addEventListener("load", getAdviceQuote);
