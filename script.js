function drawTetrisPlayground(x,y, target){
    if(x <= 0 || y <= 0)throw new Error('x and y cannot be negative')
     
    if(target.children.length) throw new Error('Aborted: Target element should be empty!')    
    for (rowCount = 0 ; rowCount < y ; rowCount++){
        const row = document.createElement('div')
        row.className = 'row'
        row.dataset['row'] = rowCount
        row.style.transform = `translateY(${-rowCount}px)`
        for (let cellsCount = 0 ; cellsCount < x; cellsCount++){
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.dataset['cell'] = cellsCount
            cell.style.transform = `translateX(${-cellsCount}px)`
            row.append(cell)
        }
        target.append(row)
    }
}

const tetrisPlayGroundTarget = document.querySelector('.tetris-play-ground')
try{
    drawTetrisPlayground(10,20,tetrisPlayGroundTarget)
}
catch(e){
    console.log(e.message)
}

const shapes = {
    O:{ 
        shape:[[1, 1],
               [1, 1]],
        color: 'yellow'
    },

    J:{ 
        shape:[[0, 1],
               [0, 1],
               [1, 1]],
        color: 'cyan'
    },

    I: { 
        shape:[[1],
               [1],
               [1],
               [1]],
        color: 'lightblue'
    },

    L: { 
        shape:[[1, 0],
               [1, 0],
               [1, 1]],
        color: 'orange'
    },
    S: { 
        shape:[[0, 1, 1],
               [1, 1, 0]],
        color: 'yellowgreen'
    },

    T: { 
        shape:[[1, 1, 1],
               [0, 1, 0]],
        color: 'purple'
    },

    Z:{ 
        shape:[[1, 1, 0],
               [0, 1, 1]],
        color: 'red'
    }
}
const shapeKeys = Object.keys(shapes)
const shapeKeyIndex = Math.floor(Math.random()*shapeKeys.length)
const shapeKey = shapeKeys[shapeKeyIndex]

const currentShape = shapes[shapeKey]
const rowsToColor = currentShape.shape.length
const cellsToColor = currentShape.shape[0].length

for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
    const row = tetrisPlayGroundTarget.children[rowIndex];

    for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
        const cell = row.children[cellIndex];
        if (currentShape.shape[rowIndex][cellIndex]) {
            cell.style.backgroundColor = currentShape.color;
        }
    }
}











