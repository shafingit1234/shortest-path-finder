const arrangement = document.getElementById("grid-arrangement");
const x = document.createElement("table");
const y = document.createElement("tbody");
const bgCol = "#eedddd";
const obstacleCol = "#333333";
const startCol = "MediumSeaGreen";
const endCol = "#ff3399";
const fillingCol = "Dodgerblue";
let check = 0;
let check1 = 0;
//starting coorinates
//source[0] = rowIndex, source[1] = cellIndex
let source = [1, 1];
let destination = [4, 5];
let obstacleArr = [];
let mainArr = []; //will store child nodes all possible path coordinates.
x.setAttribute("id", "myTable");
arrangement.appendChild(x);
y.setAttribute("id", "myBody");
document.getElementById("myTable").appendChild(y);
//create dynamic table.
for (let i = 0; i < 25; i++) {
  let z = document.createElement("tr");
  document.getElementById("myBody").appendChild(z);
  for (let j = 0; j < 50; j++) {
    let w = document.createElement("td");
    w.setAttribute("style", "background-color:#eedddd;");
    z.appendChild(w);
  }
}
function start() {
  check = 1;
}
function stop() {
  check = 2;
}
function block() {
  check = 3;
}
function remove() {
  check = 4;
}
function diagonal() {
  dia = 1;
}
function reset() {
  dia = 0;
  check = 0;
  check1 = 0;
  //reset obstacleArr
  obstacleArr = [];
  s = [1, 1];
  en = [1, 1];

  //reset the table, set background back to original bgCol
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 50; j++) {
      let x = document.getElementById("myTable").rows[i].cells;
      x[j].style.backgroundColor = bgCol;
    }
  }
}

function randomBlock() {
  //function to create random obstacles
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 50; j++) {
      if (Math.random() > 0.6) {
        let x = document.getElementById("myTable").rows[i].cells;
        x[j].style.backgroundColor = obstacleCol;
        obstacleArr.push([i, j]);
      }
    }
  }
}

const table = document.getElementById("myTable");
const getTbody = table.getElementsByTagName("tbody")[0];
getTbody.onclick = function (e) {
  let rowIndex = e.target.parentNode.rowIndex;
  let cellIndex = e.target.cellIndex;
  if (check == 1) {
    //start operation.
    let x = table.rows[rowIndex].cells;
    x[cellIndex].style.backgroundColor = startCol;
    //set background color of previous selected cell to bgCol.
    x = table.rows[source[0]].cells;
    x[source[1]].style.backgroundColor = bgCol;
    //remove previous selected source
    source.push(rowIndex, cellIndex);
    source.shift();
    source.shift();
  } else if (check == 2) {
    //store distination operation
    let x = table.rows[rowIndex].cells;
    x[cellIndex].style.backgroundColor = endCol;
    x = table.rows[destination[0]].cells;
    x[destination[1]].style.backgroundColor = bgCol;
    destination.push(rowIndex, cellIndex);
    destination.shift();
    destination.shift();
  } else if (check == 3) {
    //block operation
    let x = table.rows[rowIndex].cells;
    x[cellIndex].style.backgroundColor = obstacleCol;
    obstacleArr.push(rowIndex, cellIndex);
  } else if (check == 4) {
    //remove operation
    let x = table.rows[rowIndex].cells;
    x[cellIndex].style.backgroundColor = bgCol;
    let index = -1;
    //remove rowIndex, cellIndex pair from the obstacleArr array.
    //for that find out the index where this pair is stored in obstacle array.
    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i][0] == rowIndex && obstacleArr[i][1] == cellIndex) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      obstacleArr.splice(index, 1);
    }
  }
};
//check status function

//main function.
async function main() {
  let visitedNodes = [source];
  let sourcePosition = [source[0], source[1]];
  mainArr.push([posi, null]);
  class arr {
    constructor(position, parent) {
      this.position = position;
      this.parent = parent;
    }
  }
  function findParentCl(Parentpos) {
    // for (let i = 0; i<obj)
    for (let i = 0; i < objarr.length; i++) {
      if (objarr[i].position == Parentpos) {
        return objarr[i];
      }
    }
  }
  function canVisit(cordinates) {
    for (let i = 0; i < visited.length; i++) {
      if (visited[i][0] == cordinates[0] && visited[i][1] == cordinates[1]) {
        return false;
      }
      visited.push(cordinates);
    }
    return true;
  }
  function isend(cord) {
    if (
      cord.position[0] == destination[0] &&
      cord.position[1] == destination[1]
    ) {
      return true;
    }
    return false;
  }
  function isinscope(pos) {
    if (pos[0] >= 0 && pos[1] >= 0 && pos[0] <= 24 && pos[1] <= 49) {
      return true;
    }
    return false;
  }
  function block(pos) {
    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i][0] == pos[0] && obstacleArr[i][1] == pos[1]) {
        return false;
      }
    }
    return true;
  }
  function findshortest(obj) {
    path = [];
    while (true) {
      path.push([obj.position[0], obj.position[1]]);
      obj = findParentCl(obj.parent);
      if (obj.parent == null) {
        path.push([obj.position[0], obj.position[1]]);
        path.reverse();
        return path;
      }
    }
  }
  function findChild(ppos) {}
}
