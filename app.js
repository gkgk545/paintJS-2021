const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let pointer = false;

canvas.width = 700;
canvas.height = 700;

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

function init() {
  canvas.addEventListener("mousedown", pointerTrue);
  canvas.addEventListener("mousemove", painting);
  canvas.addEventListener("mouseup", pointerFalse);
  canvas.addEventListener("mouseout", pointerFalse);
}

init();
