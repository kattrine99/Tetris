import { shapes } from './shapes';
import {createPlayground} from './tetrisUtils';
export const gameContext = {
    tetrisPlaygroundTarget: document.querySelector(
        '.tetris-playground'
    ) as HTMLDivElement,
    shapeKeys: Object.keys(shapes),
    playground: createPlayground(),
    currentShape: {
        shape: [] as number[][],
        color: '',
      },
    currentX: 3,
    currentY: 0,
    speed: 1000,
    isPaused: false,
    }