// Импортируем интерфейсы и фигуры для игры
import { IShape, IShapes } from './interfaces';
import { shapes } from './shapes';
let score = 0; // Переменная для хранения счета

// === Объявление функций ===

// Функция для отрисовки игрового поля
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

// Функция для обновления счета
function updateScore(points: number) {
  score += points;

  // Обновляем отображение на экране
  const scoreElement = document.querySelector('.tetris-score') as HTMLDivElement;
  if (scoreElement) {
    scoreElement.textContent = `Score: ${score}`;
  }
}

// Функция для отображения зафиксированных блоков на игровом поле
function renderFixedBlocks(playground: number[][], tetrisPlaygroundTarget: HTMLDivElement | null) {
  for (let row = 0; row < playground.length; row++) {
    for (let col = 0; col < playground[row].length; col++) {
      const cell = tetrisPlaygroundTarget?.children[row]?.children[
        col
      ] as HTMLDivElement;
      if (!cell) continue;

      // Если блок зафиксирован, отобразим его цвет, иначе очистим ячейку
      if (playground[row][col]) {
        cell.style.backgroundColor = 'grey';
      } else {
        cell.style.backgroundColor = '';
      }
    }
  }
}

// Функция для отображения движущейся фигуры на игровом поле
function renderShape(
  currentShape: { shape: number[][]; color: string },
  currentX: number,
  currentY: number,
  tetrisPlaygroundTarget: HTMLDivElement | null
) {
  const rowsToColor = currentShape.shape.length;
  const cellsToColor = currentShape.shape[0].length;

  for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
      if (currentShape.shape[rowIndex][cellIndex]) {
        const x = currentX + cellIndex;
        const y = currentY + rowIndex;

        // Проверяем, не выходит ли за границы
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

// Функция для удаления предыдущего состояния движущейся фигуры
function removePreviousShape(
  currentShape: { shape: number[][]; color: string },
  currentX: number,
  currentY: number,
  playground: number[][],
  tetrisPlaygroundTarget: HTMLDivElement | null
) {
  const rowsToClear = currentShape.shape.length;
  const cellsToClear = currentShape.shape[0].length;

  for (let rowIndex = 0; rowIndex < rowsToClear; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsToClear; cellIndex++) {
      if (currentShape.shape[rowIndex][cellIndex]) {
        const x = currentX + cellIndex;
        const y = currentY + rowIndex;

        // Очищаем только если здесь нет зафиксированного блока
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

// Функция для поворота фигуры на 90 градусов
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

// Функция для перемещения фигуры влево и вправо
function moveShape(direction: number, currentX: number, currentY: number, currentShape: { shape: number[][]; color: string }, playground: number[][], tetrisPlaygroundTarget: HTMLDivElement | null) {
  if (!isCollision(currentShape.shape, currentX + direction, currentY, playground)) {
    removePreviousShape(currentShape, currentX, currentY, playground, tetrisPlaygroundTarget);
    currentX += direction;
    renderShape(currentShape, currentX, currentY, tetrisPlaygroundTarget);
  }
}

// Функция для создания игрового поля как массива
function createPlayground() {
  const playground = [];
  for (let row = 0; row < 20; row++) {
    playground[row] = new Array(10).fill(0);
  }
  return playground;
}

// Функция для генерации новой фигуры
function generateNewShape(shapeKeys: string[], shapes: IShapes, currentShape: { shape: number[][]; color: string }, currentX: number, currentY: number) {
  const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
  const shapeKey = shapeKeys[shapeKeyIndex] as keyof IShapes;
  currentShape.shape = shapes[shapeKey].shape;
  currentShape.color = shapes[shapeKey].color;
  currentX = 3;
  currentY = 0;
}

// Проверка столкновения фигуры с границами или другими фигурами
function isCollision(shape: number[][], x: number, y: number, playground: number[][]): boolean {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = x + col;
        const newY = y + row;

        // Проверяем границы поля
        if (newX < 0 || newX >= 10 || newY >= 20) {
          return true;
        }

        // Проверяем на столкновение с зафиксированными блоками
        if (playground[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Фиксация фигуры на игровом поле
function fixShape(currentShape: { shape: number[][]; color: string }, currentX: number, currentY: number, playground: number[][]) {
  for (let row = 0; row < currentShape.shape.length; row++) {
    for (let col = 0; col < currentShape.shape[row].length; col++) {
      if (currentShape.shape[row][col]) {
        playground[currentY + row][currentX + col] = 1;
      }
    }
  }
}

// Функция для удаления заполненных линий
function removeFullLines(playground: number[][]) {
  let linesCleared = 0; // Счетчик удаленных линий

  for (let row = playground.length - 1; row >= 0; row--) {
    if (playground[row].every((cell) => cell === 1)) {
      playground.splice(row, 1);
      playground.unshift(new Array(10).fill(0));
      linesCleared++; // Увеличиваем счетчик
      updateScore(linesCleared * 100);
      }
    }
  }


// === Начало выполнения программы ===

// Инициализируем игровое поле
const tetrisPlaygroundTarget = document.querySelector(
  '.tetris-playground'
) as HTMLDivElement | null;

if (tetrisPlaygroundTarget) {
  drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
}

// Получаем ключи фигур
const shapeKeys = Object.keys(shapes);

// Инициализируем текущую фигуру
let currentShape : IShape = {
  shape: [],
  color: '',
};

let currentX = 3;
let currentY = 0;

generateNewShape(shapeKeys, shapes, currentShape, currentX, currentY);
console.log(currentShape);

// Инициализируем игровое поле
const playground = createPlayground();

// Рендерим фигуру на поле
renderShape(currentShape, currentX, currentY, tetrisPlaygroundTarget);

// Основной цикл игры
setInterval(() => {
  if (!isCollision(currentShape.shape, currentX, currentY + 1, playground)) {
    // Если нет столкновения, двигаем фигуру вниз
    removePreviousShape(currentShape, currentX, currentY, playground, tetrisPlaygroundTarget);
    currentY++;
    renderShape(currentShape, currentX, currentY, tetrisPlaygroundTarget);
  } else {
    // Фиксируем фигуру и генерируем новую
    fixShape(currentShape, currentX, currentY, playground);
    removeFullLines(playground);

    // Генерируем новую фигуру
    generateNewShape(shapeKeys, shapes, currentShape, currentX, currentY);
    currentX = 3;
    currentY = 0;

    renderShape(currentShape, currentX, currentY, tetrisPlaygroundTarget);
  }
}, 500); // Интервал обновления

// Управление через клавиши
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    moveShape(-1, currentX, currentY, currentShape, playground, tetrisPlaygroundTarget);
  } else if (event.key === 'ArrowRight') {
    moveShape(1, currentX, currentY, currentShape, playground, tetrisPlaygroundTarget);
  } else if (event.key === 'ArrowDown') {
    if (!isCollision(currentShape.shape, currentX, currentY + 1, playground)) {
      removePreviousShape(currentShape, currentX, currentY, playground, tetrisPlaygroundTarget);
      currentY++;
      renderShape(currentShape, currentX, currentY, tetrisPlaygroundTarget);
    }
  } else if (event.key === 'ArrowUp') {
    const rotatedShape = rotateShape(currentShape.shape);
    if (!isCollision(rotatedShape, currentX, currentY, playground)) {
      removePreviousShape(currentShape, currentX, currentY, playground, tetrisPlaygroundTarget);
      currentShape.shape = rotatedShape;
      renderShape(currentShape, currentX, currentY, tetrisPlaygroundTarget);
    }
  }
});
