import { checkRandom } from "./sodokuGenerator.js";
import randomSodoku from "./sodokuGenerator.js";

var grid = document.querySelectorAll("td");
var generateButton = document.querySelector("#generate");
var solveButton = document.querySelector("#solve");
//var resetButton = document.querySelector("#reset");
var levelSelector = document.querySelector("#levelSelector");
var timer;
var difficultyLevel = 1;
var stopFlag = 0;
var matrix = new Array(9).fill(null).map(() => new Array(9).fill(null));

levelSelector.addEventListener("change", function () {
  difficultyLevel = levelSelector.value;
});

// resetButton.addEventListener("click", function () {
//   let tempmatrix = new Array(9).fill(null).map(() => new Array(9).fill(null));
//   matrix = tempmatrix;
//   for (let i = 0; i < 81; i++) {
//     grid[i].style.backgroundColor = "rgba(96, 129, 129, 0.4) ";
//   }
//   matrixToGrid();
// });

generateButton.addEventListener("click", function () {
  for (let i = 0; i < 81; i++) {
    grid[i].style.backgroundColor = "rgba(96, 129, 129, 0.4) ";
  }
  matrix = randomSodoku(difficultyLevel);
  matrixToGrid();
  timer = 200 - document.querySelector("#timer").value;
});

solveButton.addEventListener("click", function () {
  let counter = { count: 0 };
  solveSodoku(0, 0, matrix, counter);
  stopFlag = 0;
});

function matrixToGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      grid[9 * i + j].textContent = matrix[i][j];
    }
  }
}

const solveSodoku = (i, j, matrix1, counter) => {
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
  counter.count = counter.count + 1;

  if (matrix1[i][j] !== null) {
    if (solveSodoku(ni, nj, matrix1, counter) == 1) return 1;
  } else {
    for (let value = 1; value <= 9; value++) {
      if (checkRandom(value, i, j, matrix1)) {
        matrix1[i][j] = value;
        ((val) => {
          setTimeout(() => {
            if (i == 8 && j == 8) stopFlag = 1;
            if (stopFlag == 0) {
              solveButton.disabled = true;
              generateButton.disabled = true;
              //resetButton.disabled = true;
            } else {
              solveButton.disabled = false;
              generateButton.disabled = false;
              //resetButton.disabled = false;
            }
            grid[9 * i + j].textContent = val;
            grid[9 * i + j].style.backgroundColor = "#4ED03A";
          }, counter.count * timer);
        })(matrix1[i][j]);
        if (solveSodoku(ni, nj, matrix1, counter) == 1) return 1;
        matrix1[i][j] = null;
        ((val) => {
          setTimeout(() => {
            grid[9 * i + j].textContent = null;
            grid[9 * i + j].style.backgroundColor = "rgba(96, 129, 129, 0.4)";
          }, counter.count * timer);
        })(matrix1[i][j]);
      }
    }
  }
};
