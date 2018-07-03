const createHitMissBoard = (n = 8) => new Array(n).fill(new Array(n).fill('W'));

const drawFowl = (board, startX, startY, vertical, direction, size, symbol) => {
  let clonedBoard = board.reduce((acc, e) => {
    acc.push([...e]);
    return acc;
  }, []);
  for (let i = 0; Math.abs(i) < size; i += direction) {
    if (vertical) {
      if (clonedBoard[startX][startY + i] !== 'W') return null;
      clonedBoard[startX][startY + i] = symbol;
    }
    else {
      if (clonedBoard[startX + i][startY] !== 'W') return null;
      clonedBoard[startX + i][startY] = symbol;
    }
  }
  return clonedBoard;
};

const placeFowl = (board, size, symbol) => {
  let clonedBoard = board.reduce((acc, e) => {
    acc.push([...e]);
    return acc;
  }, []);
  const n = board.length;
  const startX = Math.floor(Math.random() * n);
  const startY = Math.floor(Math.random() * n);
  const vertical = Boolean(Math.round(Math.random()));
  console.log('vars: ', startX, startY, vertical);
  let newBoard = clonedBoard.reduce((acc, e) => {
    acc.push([...e]);
    return acc;
  }, []);
  if (vertical) {
    // check to make sure we don't build a duck over the edge
    if (startY - (size - 1) < 0) {
      // go south (++y)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, 1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else if (startY + (size - 1) >= n) {
      // go north (--y)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, -1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else {
      // random north or south
      const direction = Math.round(Math.random()) === 0 ? -1 : 1;
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, direction, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    }
  } else {
    if (startX - (size - 1) < 0) {
      // go east (++x)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, 1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else if (startX + (size - 1) >= n) {
      // go west (--x)
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, -1, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    } else {
      // random east or west
      const direction = Math.round(Math.random()) === 0 ? -1 : 1;
      newBoard = drawFowl(clonedBoard, startX, startY, vertical, direction, size, symbol);
      if (!newBoard) return placeFowl(clonedBoard, size, symbol);
    }
  }
  return newBoard;
}

const createDucksBoard = (n = 8, numGeese = 1, numDucks = 1, numDucklings = 1) => {
  let board = new Array(n).fill(new Array(n).fill('W'));
  // place a goose
  board = placeFowl(board, 4, 'G');
  // place a duck
  board = placeFowl(board, 3, 'D');
  // place a duckling
  board = placeFowl(board, 2, 'B');
  return board;
};

const createBoard = () => {
  const ducksBoard = createDucksBoard();
  const hitsAndMissesBoard = createHitMissBoard();
  return {ducksBoard, hitsAndMissesBoard};
}
const verifyDucksBoard = (board) => {
  // board.reduce(acc, e => acc.concat(e), []).reduce((acc, e) => {

  // })
};

export default createBoard;

