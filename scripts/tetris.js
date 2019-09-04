/* jshint esversion: 6 */

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);



const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

function collides(arena, player) {
  const [matrix, offset] = [player.matrix, player.pos];

  for ((let y = 0); y < matrix.length; ++y) {
    for ((let x = 0); x < matrix[y].length; ++x) {
      if (matrix[y][x] !== 0 && (arena[y + offset.y] && arena[y + offset.y][x + offset.x]) !== 0) {
        return true;
      }
    }
  }

  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}


function draw() {
  // Clear canvas
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerDrop() {
  player.pos.y++;
  dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
  // Time deltas
  const deltaTime = time - lastTime;
  lastTime = time;

  // Drop logic
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update); // Keep loopin'
}

const arena = createMatrix(12, 20);

const player = {
  pos: {x: 5, y: 5},
  matrix: matrix
};

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    player.pos.x--;
  } else if (event.keyCode === 38) {
    player.pos.y--; // TEMP
  } else if (event.keyCode === 39) {
    player.pos.x++;
  } else if (event.keyCode === 40) {
    playerDrop();
  }
});

// Start loop
requestAnimationFrame(update);
