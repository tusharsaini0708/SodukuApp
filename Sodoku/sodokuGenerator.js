var matrix = new Array(9).fill(null).map(() => new Array(9).fill(null));

function genRandomArray(count) {
  let arr = [],
    random;
  for (let i = 0; i < count; i++) {
    random = Math.ceil(Math.random() * 9);
    if (arr.includes(random)) {
      i--;
      continue;
    } else arr.push(random);
  }
  return arr;
}

function checkRandom(random, i, j, matrix) {
  for (let tempI = 0; tempI < 9; tempI++) {
    if (matrix[tempI][j] == random) return false;
  }
  for (let tempJ = 0; tempJ < 9; tempJ++) {
    if (matrix[i][tempJ] == random) return false;
  }

  let someI = Math.floor(i / 3);
  someI = someI * 3;
  let someJ = Math.floor(j / 3);
  someJ = someJ * 3;
  for (let tempI = someI; tempI < someI + 3; tempI++) {
    for (let tempJ = someJ; tempJ < someJ + 3; tempJ++) {
      if (matrix[tempI][tempJ] === random) return false;
    }
  }
  return true;
}

const solveSodoku = (i, j, tempMatrix, order) => {
  if (i == 9) {
    return 1;
  }

  let ni = 0,
    nj = 0;
  if (j !== 8) {
    ni = i;
    nj = j + 1;
  } else {
    ni = i + 1;
    nj = 0;
  }

  if (tempMatrix[i][j] !== null) {
    if (solveSodoku(ni, nj, tempMatrix, order) == 1) return 1;
  } else {
    for (let k = 0; k < 9; k++) {
      let value = order[i][j][k];
      if (checkRandom(value, i, j, tempMatrix)) {
        tempMatrix[i][j] = value;
        if (solveSodoku(ni, nj, tempMatrix, order) == 1) return 1;
        tempMatrix[i][j] = null;
      }
    }
  }
};

function removeElements(tempMatrix, difficultyLevel) {
  let min = 20,
    max = 30;
  difficultyLevel = parseInt(difficultyLevel);
  if (difficultyLevel === 1) {
    min = 40;
    max = 47;
  }
  if (difficultyLevel === 2) {
    min = 48;
    max = 54;
  }
  if (difficultyLevel === 3) {
    min = 55;
    max = 60;
  }
  let k = Math.floor(Math.random() * (max - min) + min);
  console.log(k);
  //k number of elements to be removed
  let row, colomn;
  for (let i = 0; i < k; i++) {
    row = Math.floor(Math.random() * 9);
    colomn = Math.floor(Math.random() * 9);
    if (tempMatrix[row][colomn] === null) {
      i--;
      continue;
    } else tempMatrix[row][colomn] = null;
  }
}

function genRandomSodoku(difficultyLevel) {
  matrix = new Array(9).fill(null).map(() => new Array(9).fill(null));
  let order = [];
  for (let i = 0; i < 9; i++) {
    let tempOrder = [];
    for (let j = 0; j < 9; j++) {
      tempOrder.push(genRandomArray(9)); // generate an array of random order nine elements
    }
    order.push(tempOrder);
  }
  solveSodoku(0, 0, matrix, order);
  removeElements(matrix, difficultyLevel);
  return matrix;
}
export default genRandomSodoku;
export { checkRandom };
