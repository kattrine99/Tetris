import { IShapes } from './interfaces';
import { shapes } from './shapes';
import {gameContext} from './gameContext'
export function drawTetrisPlayground(x: number, y: number, target: HTMLDivElement) {
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
  
export function renderFixedBlocks() {
    for (let row = 0; row < gameContext.playground.length; row++) {
      for (let col = 0; col < gameContext.playground[row].length; col++) {
        const cell = gameContext.tetrisPlaygroundTarget?.children[row]?.children[
          col
        ] as HTMLDivElement;
        if (!cell) continue;
  
        if (gameContext.playground[row][col]) {
          cell.style.backgroundColor = 'white';
        } else {
          cell.style.backgroundColor = '';
        }
      }
    }
  }
  
export function renderShape() {
    const rowsToColor = gameContext.currentShape.shape.length;
    const cellsToColor = gameContext.currentShape.shape[0].length;
  
    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
      for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
        if (gameContext.currentShape.shape[rowIndex][cellIndex]) {
          const x = gameContext.currentX + cellIndex;
          const y = gameContext.currentY + rowIndex;
  
          if (x >= 0 && x < 10 && y >= 0 && y < 20) {
            const cell = gameContext.tetrisPlaygroundTarget?.children[y]?.children[
              x
            ] as HTMLDivElement;
            if (cell) {
              cell.style.backgroundColor = gameContext.currentShape.color;
            }
          }
        }
      }
    }
  }
  
export function removePreviousShape() {
    const rowsToClear = gameContext.currentShape.shape.length;
    const cellsToClear = gameContext.currentShape.shape[0].length;
  
    for (let rowIndex = 0; rowIndex < rowsToClear; rowIndex++) {
      for (let cellIndex = 0; cellIndex < cellsToClear; cellIndex++) {
        if (gameContext.currentShape.shape[rowIndex][cellIndex]) {
          const x = gameContext.currentX + cellIndex;
          const y = gameContext.currentY + rowIndex;
          if (x >= 0 && x < 10 && y >= 0 && y < 20) {
  
            if (!gameContext.playground[y][x]) {
              const cell = gameContext.tetrisPlaygroundTarget?.children[y]?.children[
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
  
export function rotateShape(shape: number[][]): number[][] {
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
  
export function moveShape(direction: number) {
    if (!isCollision(gameContext.currentShape.shape, gameContext.currentX + direction, gameContext.currentY)) {
      removePreviousShape();
      gameContext.currentX += direction;
      renderShape();
    }
  }
  
export function createPlayground() {
    const playground = [];
    for (let row = 0; row < 20; row++) {
      playground[row] = new Array(10).fill(0);
    }
    return playground;
  }
  
  
export function generateNewShape() {
    const shapeKeyIndex = Math.floor(Math.random() * gameContext.shapeKeys.length);
    const shapeKey = gameContext.shapeKeys[shapeKeyIndex] as keyof IShapes;
    gameContext.currentShape.shape = shapes[shapeKey].shape;
    gameContext.currentShape.color = shapes[shapeKey].color;
    gameContext.currentX = 3;
    gameContext.currentY = 0;
  }
  
  
export function isCollision(shape: number[][], x: number, y: number): boolean {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = x + col;
          const newY = y + row;
  
  
          if (newX < 0 || newX >= 10 || newY >= 20) {
            return true;
          }
  
          if (gameContext.playground[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  
  
export function fixShape() {
    for (let row = 0; row < gameContext.currentShape.shape.length; row++) {
      for (let col = 0; col < gameContext.currentShape.shape[row].length; col++) {
        if (gameContext.currentShape.shape[row][col]) {
            gameContext.playground[gameContext.currentY + row][gameContext.currentX + col] = 1;
        }
      }
    }
  }
  
  
export function removeFullLines() {
    for (let row = gameContext.playground.length - 1; row >= 0; row--) {
      if (gameContext.playground[row].every((cell) => cell === 1)) {
        gameContext.playground.splice(row, 1);
        gameContext.playground.unshift(new Array(10).fill(0));
      }
    }
    renderFixedBlocks();
  }
  