const mainCanvas = document.getElementById("mainCanvas");
const overlayCanvas = document.getElementById("overlayCanvas");
const mainCanvasCtx = mainCanvas.getContext("2d");
const overlayCanvasCtx = overlayCanvas.getContext("2d");
const selection = new Image();

const numberOfRows = 25;
const numberOfColumns = 25;

class Hexagon {
  constructor(hexagonSize = 32, hexagonBorderWidth = 0) {
    this.size = hexagonSize;
    this.borderWidth = hexagonBorderWidth;
    this.width = hexagonSize * Math.sqrt(3);
    this.height = hexagonSize * 2;
    this.horizontalOffset = this.width;
    this.verticalOffset = (3 / 4) * this.height;
  }

  size;
  borderWidth;
  width;
  height;
  horizontalOffset;
  verticalOffset;

  draw(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x + (0.5 * this.width), y + 0 + this.borderWidth);
    ctx.lineTo(x + this.width - this.borderWidth, y + (0.25 * this.height));
    ctx.lineTo(x + this.width - this.borderWidth, y + (0.75 * this.height));
    ctx.lineTo(x + (0.5 * this.width), y + this.height - this.borderWidth);
    ctx.lineTo(x + 0 + this.borderWidth, y + (0.75 * this.height));
    ctx.lineTo(x + 0 + this.borderWidth, y + (0.25 * this.height));
    ctx.fill();
  }
}

const hexagon = new Hexagon(32, 1);

overlayCanvas.addEventListener("mousedown", (event) => {
  overlayCanvasCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  let closestHex = null;
  let minDistance = Infinity;

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      const x = col * hexagon.horizontalOffset + (row % 2 === 0 ? 0 : hexagon.width / 2);
      const y = row * hexagon.verticalOffset;

      // distance = Math.sqrt((x2 - x1)^2 + (y2 - y1)^2)
      const dx = clickX - (x + (hexagon.width / 2));
      const dy = clickY - (y + (hexagon.height / 2));
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance && distance <= hexagon.size) {
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
    const x = col * hexagon.horizontalOffset + (row % 2 === 0 ? 0 : hexagon.width / 2);
    const y = row * hexagon.verticalOffset;
    hexagon.draw(mainCanvasCtx, x, y, '#f6c567')
  }
}

selection.src = "assets/Pointers/02.png";