const screens = Array.from(document.querySelectorAll(".screen"));
const startButton = document.querySelector("[data-start]");
const gardenScreen = document.querySelector('[data-screen="garden"]');
const yesButton = document.querySelector("[data-yes]");
const noButton = document.querySelector("[data-no]");
const finalYesButton = document.querySelector("[data-final-yes]");
const buttonStage = document.querySelector("[data-button-stage]");
const tapCount = document.querySelector("[data-tap-count]");

let yesPresses = 0;
const requiredPresses = 9;

function onPress(element, action) {
  let handledPointer = false;

  element.addEventListener("pointerup", (event) => {
    handledPointer = true;
    event.preventDefault();
    action();
  });

  element.addEventListener("click", (event) => {
    if (handledPointer) {
      handledPointer = false;
      return;
    }

    event.preventDefault();
    action();
  });

  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  });
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("screen-active", screen.dataset.screen === name);
  });
}

function startGarden() {
  showScreen("garden");
  gardenScreen.classList.remove("grow");
  requestAnimationFrame(() => gardenScreen.classList.add("grow"));

  window.setTimeout(() => {
    showScreen("question");
    resetYesButton();
  }, 3600);
}

function resetYesButton() {
  yesPresses = 0;
  tapCount.textContent = "";
  yesButton.style.left = "calc(50% - 128px)";
  yesButton.style.top = "94px";
}

function moveYesButton() {
  yesPresses += 1;

  if (yesPresses >= requiredPresses) {
    showScreen("please");
    return;
  }

  const stageRect = buttonStage.getBoundingClientRect();
  const buttonRect = yesButton.getBoundingClientRect();
  const maxLeft = Math.max(0, stageRect.width - buttonRect.width);
  const maxTop = Math.max(0, stageRect.height - buttonRect.height);
  const left = Math.round(Math.random() * maxLeft);
  const top = Math.round(Math.random() * maxTop);

  yesButton.style.left = `${left}px`;
  yesButton.style.top = `${top}px`;
  tapCount.textContent = "";
}

function showPlease() {
  showScreen("please");
}

onPress(startButton, startGarden);
onPress(yesButton, moveYesButton);
onPress(noButton, showPlease);
onPress(finalYesButton, () => showScreen("celebration"));

window.addEventListener("resize", () => {
  if (document.querySelector('[data-screen="question"]').classList.contains("screen-active")) {
    resetYesButton();
  }
});
