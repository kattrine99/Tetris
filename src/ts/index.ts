import { IShapes } from './interfaces';
import { shapes } from './shapes';

function drawTetrisPlayground(x: number, y: number, target: HTMLDivElement) {
  if (x <= 0 || y <= 0) throw new Error('x and y cannot be negative');

  if (target.children.length)
    throw new Error('Aborted: target element should be empty');

  for (let rowsCount = 0; rowsCount < y; rowsCount++) {
    const row = document.createElement('div');
    row.className = 'row';
    row.dataset['row'] = rowsCount.toString();

    for (let cellsCount = 0; cellsCount < x; cellsCount++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset['cell'] = cellsCount.toString();
      row.append(cell);
    }

    target.append(row);
  }
}

function renderFixedBlocks() {
  for (let row = 0; row < playground.length; row++) {
    for (let col = 0; col < playground[row].length; col++) {
      const cell = tetrisPlaygroundTarget?.children[row]?.children[
        col
      ] as HTMLDivElement;
      if (!cell) continue;

      if (playground[row][col]) {
        cell.style.backgroundColor = 'white';
      } else {
        cell.style.backgroundColor = '';
      }
    }
  }
}

function renderShape() {
  const rowsToColor = currentShape.shape.length;
  const cellsToColor = currentShape.shape[0].length;

  for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
      if (currentShape.shape[rowIndex][cellIndex]) {
        const x = currentX + cellIndex;
        const y = currentY + rowIndex;

        if (x >= 0 && x < 10 && y >= 0 && y < 20) {
          const cell = tetrisPlaygroundTarget?.children[y]?.children[
            x
          ] as HTMLDivElement;
          if (cell) {
            cell.style.backgroundColor = currentShape.color;
          }
        }
      }
    }
  }
}

function removePreviousShape() {
  const rowsToClear = currentShape.shape.length;
  const cellsToClear = currentShape.shape[0].length;

  for (let rowIndex = 0; rowIndex < rowsToClear; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsToClear; cellIndex++) {
      if (currentShape.shape[rowIndex][cellIndex]) {
        const x = currentX + cellIndex;
        const y = currentY + rowIndex;
        if (x >= 0 && x < 10 && y >= 0 && y < 20) {

          if (!playground[y][x]) {
            const cell = tetrisPlaygroundTarget?.children[y]?.children[
              x
            ] as HTMLDivElement;
            if (cell) {
              cell.style.backgroundColor = '';
            }
          }
        }
      }
    }
  }
}

function rotateShape(shape: number[][]): number[][] {
  const rotatedShape: number[][] = [];
  const rows = shape.length;
  const cols = shape[0].length;

  for (let col = 0; col < cols; col++) {
    rotatedShape[col] = [];
    for (let row = rows - 1; row >= 0; row--) {
      rotatedShape[col][rows - 1 - row] = shape[row][col];
    }
  }

  return rotatedShape;
}

function moveShape(direction: number) {
  if (!isCollision(currentShape.shape, currentX + direction, currentY)) {
    removePreviousShape();
    currentX += direction;
    renderShape();
  }
}

function createPlayground() {
  const playground = [];
  for (let row = 0; row < 20; row++) {
    playground[row] = new Array(10).fill(0);
  }
  return playground;
}


function generateNewShape() {
  const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
  const shapeKey = shapeKeys[shapeKeyIndex] as keyof IShapes;
  currentShape.shape = shapes[shapeKey].shape;
  currentShape.color = shapes[shapeKey].color;
  currentX = 3;
  currentY = 0;
}


function isCollision(shape: number[][], x: number, y: number): boolean {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = x + col;
        const newY = y + row;


        if (newX < 0 || newX >= 10 || newY >= 20) {
          return true;
        }

        if (playground[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
}


function fixShape() {
  for (let row = 0; row < currentShape.shape.length; row++) {
    for (let col = 0; col < currentShape.shape[row].length; col++) {
      if (currentShape.shape[row][col]) {
        playground[currentY + row][currentX + col] = 1;
      }
    }
  }
}


function removeFullLines() {
  for (let row = playground.length - 1; row >= 0; row--) {
    if (playground[row].every((cell) => cell === 1)) {
      playground.splice(row, 1);
      playground.unshift(new Array(10).fill(0));
    }
  }
  renderFixedBlocks();
}


const tetrisPlaygroundTarget = document.querySelector(
  '.tetris-playground'
) as HTMLDivElement | null;

if (tetrisPlaygroundTarget) {
  drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
}


const shapeKeys = Object.keys(shapes);


const currentShape = {
  shape: [] as number[][],
  color: '',
};

let currentX = 3;
let currentY = 0;
let speed = 1000;
let isPaused = false;
const playground = createPlayground();
generateNewShape(); 

renderShape();

function gameLoop() {
  setTimeout(() => {
    if (!isPaused) {
      if (!isCollision(currentShape.shape, currentX, currentY + 1)) {
        removePreviousShape();
        currentY++;
        renderShape();
      } else {
        fixShape();
        removeFullLines();
        generateNewShape();

        if (isCollision(currentShape.shape, currentX, currentY)) {
          alert('Игра окончена');
          return;
        }

        renderShape();
      }
    }
    gameLoop();
  }, speed);
}

gameLoop();

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    const newShape = rotateShape(currentShape.shape);
    if (!isCollision(newShape, currentX, currentY)) {
      removePreviousShape();
      currentShape.shape = newShape;
      renderShape();
      
    }
  } else if (e.code === 'ArrowLeft') {
    moveShape(-1);
  } else if (e.code === 'ArrowRight') {
    moveShape(1);
  } else if (e.code === 'ArrowDown') {
    speed = 100; 
  }
});


document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown') {
    speed = 1000; 
  }
});

const moveLeftButton = document.getElementById('moveLeft') as HTMLButtonElement;
//const movePauseButton = document.getElementById('enter') as HTMLButtonElement;
const moveRightButton = document.getElementById('moveRight') as HTMLButtonElement;

moveLeftButton.addEventListener('click', () => moveShape(-1));
//movePauseButton.addEventListener('click', ()=>);
moveRightButton.addEventListener('click', () => moveShape(1)); 