import { IShapes } from './interfaces';
import { shapes } from './shapes';
import {
  drawTetrisPlayground,
  renderFixedBlocks,
  renderShape,
  removePreviousShape,
  rotateShape,
  moveShape,
  createPlayground,
  generateNewShape,
  isCollision,
  fixShape,
  removeFullLines,
} from './tetrisUtils';
import {gameContext} from './gameContext'

if (gameContext) {
  drawTetrisPlayground(10, 20,gameContext.tetrisPlaygroundTarget);
}
generateNewShape(); 

renderShape();

function gameLoop() {
  setTimeout(() => {
    if (!gameContext.isPaused) {
      if (!isCollision(gameContext.currentShape.shape, gameContext.currentX, gameContext.currentY + 1)) {
        removePreviousShape();
        gameContext.currentY++;
        renderShape();
      } else {
        fixShape();
        removeFullLines();
        generateNewShape();

        if (isCollision(gameContext.currentShape.shape, gameContext.currentX, gameContext.currentY )) {
          alert('Игра окончена');
          return;
        }

        renderShape();
      }
    }
    gameLoop();
  }, gameContext.speed);
}

gameLoop();

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    const newShape = rotateShape(gameContext.currentShape.shape);
    if (!isCollision(newShape, gameContext.currentX, gameContext.currentY)) {
      removePreviousShape();
      gameContext.currentShape.shape = newShape;
      renderShape();
      
    }
  } else if (e.code === 'ArrowLeft') {
    moveShape(-1);
  } else if (e.code === 'ArrowRight') {
    moveShape(1);
  } else if (e.code === 'ArrowDown') {
    gameContext.speed = 100; 
  }
});


document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown') {
    gameContext.speed = 1000; 
  }
});

const moveLeftButton = document.getElementById('moveLeft') as HTMLButtonElement;
//const movePauseButton = document.getElementById('enter') as HTMLButtonElement;
const moveRightButton = document.getElementById('moveRight') as HTMLButtonElement;

moveLeftButton.addEventListener('click', () => moveShape(-1));
//movePauseButton.addEventListener('click', ()=>);
moveRightButton.addEventListener('click', () => moveShape(1)); 