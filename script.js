const uploadImage = document.getElementById("uploadImage");
const topInput = document.getElementById("topInput");
const bottomInput = document.getElementById("bottomInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let image = new Image();

// Загружаем выбранную картинку
uploadImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// Когда картинка загрузилась — рисуем на канвасе
image.onload = function() {
  const maxWidth = 600;
  const maxHeight = 600;
  let ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);

  canvas.width = image.width * ratio;
  canvas.height = image.height * ratio;
  drawMeme();
}

// Функция для рисования мема
function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const fontSize = canvas.width / 10;
  ctx.font = `${fontSize}px Impact`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = fontSize / 15;
  ctx.textAlign = "center";

  // Текст сверху
  ctx.fillText(topInput.value.toUpperCase(), canvas.width/2, fontSize);
  ctx.strokeText(topInput.value.toUpperCase(), canvas.width/2, fontSize);

  // Текст снизу
  ctx.fillText(bottomInput.value.toUpperCase(), canvas.width/2, canvas.height - 20);
  ctx.strokeText(bottomInput.value.toUpperCase(), canvas.width/2, canvas.height - 20);
}

// Генерация мема
generateBtn.addEventListener("click", drawMeme);

// Скачивание мема
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
