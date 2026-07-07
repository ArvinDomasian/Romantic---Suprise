const screens = Array.from(document.querySelectorAll(".screen"));
const startButton = document.querySelector("[data-start]");
const yesButton = document.querySelector("[data-yes]");
const noButton = document.querySelector("[data-no]");
const finalYesButton = document.querySelector("[data-final-yes]");
const buttonStage = document.querySelector("[data-button-stage]");

let noPresses = 0;
const requiredNoPresses = 9;
const gardenAnimationTime = 9000;

onload = () => {
  document.body.classList.remove("container");
};

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
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("screen-active", screen.dataset.screen === name);
  });
}

function startGarden() {
  showScreen("garden");
  document.body.classList.add("container");
  void document.body.offsetWidth;

  window.setTimeout(() => {
    document.body.classList.remove("container");
  }, 1000);

  window.setTimeout(() => {
    showScreen("question");
    resetButtons();
  }, gardenAnimationTime);
}

function resetButtons() {
  noPresses = 0;
  yesButton.style.left = "calc(50% - 128px)";
  yesButton.style.top = "94px";
  noButton.style.left = "calc(50% + 16px)";
  noButton.style.top = "94px";
}

function moveNoButton() {
  noPresses += 1;

  if (noPresses >= requiredNoPresses) {
    showScreen("please");
    return;
  }

  const stageRect = buttonStage.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const maxLeft = Math.max(0, stageRect.width - buttonRect.width);
  const maxTop = Math.max(0, stageRect.height - buttonRect.height);

  noButton.style.left = `${Math.round(Math.random() * maxLeft)}px`;
  noButton.style.top = `${Math.round(Math.random() * maxTop)}px`;
}

onPress(startButton, startGarden);
onPress(yesButton, () => showScreen("celebration"));
onPress(noButton, moveNoButton);
onPress(finalYesButton, () => showScreen("celebration"));

window.addEventListener("resize", () => {
  if (document.querySelector('[data-screen="question"]').classList.contains("screen-active")) {
    resetButtons();
  }
});
