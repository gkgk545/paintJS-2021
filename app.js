const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const colors = document.querySelectorAll("#jsColor"); //다중선택 => querySelectorAll
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

let pointer = false;
let filling = false;

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "black";
ctx.lineWidth = 5;

function painting(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!pointer) {
    ctx.beginPath();
    ctx.moveTo(x, y); //시작점(없는 경우, 첫 번째 lineTo()를 시작점으로 인식하기 때문에 없어도 됨.)
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function pointerFalse() {
  pointer = false;
}

function pointerTrue() {
  pointer = true;
}

function handleRange(event) {
  const currentValue = event.target.value;
  ctx.lineWidth = currentValue;
}

function handleColor(event) {
  const currentColor = event.target.style.backgroundColor;
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
}

function handleMode(event) {
  if (filling === false) {
    event.target.innerText = "PAINT";
    filling = true;
  } else {
    event.target.innerText = "FILL";
    filling = false;
  }
}

function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function saveImage() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Painting_Result🎨";
  link.click();
}

function init() {
  canvas.addEventListener("mousedown", pointerTrue);
  canvas.addEventListener("mousemove", painting);
  canvas.addEventListener("mouseup", pointerFalse);
  canvas.addEventListener("mouseout", pointerFalse);
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  range.addEventListener("input", handleRange);

  Array.from(colors).forEach((color) => {
    color.addEventListener("click", handleColor);
  });

  mode.addEventListener("click", handleMode);
  canvas.addEventListener("click", fillCanvas);

  save.addEventListener("click", saveImage);
}

init();
