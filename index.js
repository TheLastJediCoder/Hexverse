const mainCanvas = document.getElementById("mainCanvas");
const overlayCanvas = document.getElementById("overlayCanvas");
const mainCanvasCtx = mainCanvas.getContext("2d");
const overlayCanvasCtx = overlayCanvas.getContext("2d");
const selection = new Image();

const numberOfRows = 25;
const numberOfColumns = 25;

const hexagonSize = 32;
const hexagonBorderWidth = 3;
const hexagonWidth = hexagonSize * Math.sqrt(3);
const hexagonHeight = hexagonSize * 2;
const horizontalOffset = hexagonWidth;
const verticalOffset = (3 / 4) * hexagonHeight;

function drawHexagon(ctx, x, y, hexagonSize, hexagonBoarderWidth, color) {
  const height = 2 * hexagonSize;
  const width = Math.sqrt(3) * hexagonSize;
  ctx.beginPath();
  ctx.fillStyle = '#c09250';
  ctx.moveTo(x + (0.5 * width), y + 0);
  ctx.lineTo(x + width, y + (0.25 * height));
  ctx.lineTo(x + width, y + (0.75 * height));
  ctx.lineTo(x + (0.5 * width), y + height);
  ctx.lineTo(x + 0, y + (0.75 * height));
  ctx.lineTo(x + 0, y + (0.25 * height));
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x + (0.5 * width), y + 0 + hexagonBoarderWidth);
  ctx.lineTo(x + width - hexagonBoarderWidth, y + (0.25 * height));
  ctx.lineTo(x + width - hexagonBoarderWidth, y + (0.75 * height));
  ctx.lineTo(x + (0.5 * width), y + height - hexagonBoarderWidth);
  ctx.lineTo(x + 0 + hexagonBoarderWidth, y + (0.75 * height));
  ctx.lineTo(x + 0 + hexagonBoarderWidth, y + (0.25 * height));
  ctx.fill();
}

overlayCanvas.addEventListener("mousedown", (event) => {
  overlayCanvasCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  let closestHex = null;
  let minDistance = Infinity;

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      const x = col * horizontalOffset + (row % 2 === 0 ? 0 : hexagonWidth / 2);
      const y = row * verticalOffset;

      // distance = Math.sqrt((x2 - x1)^2 + (y2 - y1)^2)
      mainCanvasCtx.fillRect(x + (hexagonWidth / 2), y + (hexagonHeight / 2), 1, 1)

      const dx = clickX - (x + (hexagonWidth / 2));
      const dy = clickY - (y + (hexagonHeight / 2));
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestHex = {x: x, y: y};
      }
    }
  }

  if (closestHex) {
    overlayCanvasCtx.drawImage(selection, closestHex.x - 4, closestHex.y)
  }
});

for (let row = 0; row < numberOfRows; row++) {
  for (let col = 0; col < numberOfColumns; col++) {
    const x = col * horizontalOffset + (row % 2 === 0 ? 0 : hexagonWidth / 2);
    const y = row * verticalOffset;
    drawHexagon(mainCanvasCtx, x, y, hexagonSize, hexagonBorderWidth, '#f6c567')
  }
}

selection.src = "assets/Pointers/02.png";