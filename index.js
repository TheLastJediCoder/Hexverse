const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();

canvas.addEventListener("mousedown", (event) => {
  const x = event.clientX - canvas.getBoundingClientRect().left;
  const y = event.clientY - canvas.getBoundingClientRect().top;

  console.log("x:", x, "y:", y);
});

// Remove blank part from top of the tile
const cropTop = 260;

const size = 1/8
const hexSize = 296;
const hexWidth = hexSize * Math.sqrt(3);
const hexHeight = hexSize * 2;

const borderSize = 8;

const horizontalOffset = hexWidth - borderSize;
const verticalOffset = 3/4 * hexHeight - borderSize;

const numberOfRows = 5;
const numberOfColumns = 5;


img.addEventListener("load", () => {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      const x = col * horizontalOffset + (row % 2 === 0 ? 0 : hexWidth / 2);
      const y = row * verticalOffset;
      ctx.drawImage(img, 0, cropTop, hexWidth, hexHeight, x * size, y * size, hexWidth * size, hexHeight * size);
    }
  }
})

img.src = 'assets/tiles/Desert_Tile0.png'