var gameover = 0;

var score1 = 0;
var score2 = 0;
var player1 = document.querySelector(".score1");
var player2 = document.querySelector(".score2");
player1.innerHTML = score1;
player2.innerHTML = score2;
var playerTurn = 0;
var atCenter = false;
var atCorner = false;
var atMiddle = false;

var refresh = document.querySelector(".rotate");

//blocks not taken
var notTaken = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Computer first turn matrix
firstTurnMatrix = [5, 1, 3, 5, 7, 9];
var firstTurnIndex = Math.floor(Math.random() * firstTurnMatrix.length);
// console.log(firstTurnIndex);

//winning matrix
var winningmatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
var corners = [1, 3, 7, 9];
var middles = [2, 4, 6, 8];
var count = 0;
//adding eventlistener click

refresh.addEventListener("click", function () {
  restart();
});
for (let i = 1; i <= 9; i++) {
  document.querySelector(".b" + i).addEventListener("click", function (e) {
    addElement(e.target.className, "O");
  });
}
if (playerTurn == 0) {
  computerTurn();
}

// computer begins first
function computerTurn() {
  if (count >= 9) {
    return;
  }
  if (playerTurn === 0) {
    // if the computer puts in the middle
    if (firstTurnMatrix[firstTurnIndex] === 5) {
      // console.log("hello");
      if (count == 0) {
        addElement("b5", "X");
      } else if (count == 2) {
        if (corners.length != 4) {
          if (document.querySelector(".b1").innerHTML != "") {
            addElement("b3", "X");
            return;
          } else if (document.querySelector(".b3").innerHTML != "") {
            addElement("b9", "X");
            return;
          } else if (document.querySelector(".b7").innerHTML != "") {
            addElement("b1", "X");
            return;
          } else {
            addElement("b7", "X");
            return;
          }
        } else {
          // this is done so that if in the middle is given then suppose if b6 is given by the user then the ai should give b7 so that to prevent it the user will give at a corner which will give the user a potential to win to defend which the computer will give at another corner to the computer wins
          if (document.querySelector(".b6").innerHTML != "") {
            addElement("b7", "X");
            return;
          } else if (document.querySelector(".b2").innerHTML != "") {
            addElement("b9", "X");
            return;
          } else if (document.querySelector(".b4").innerHTML != "") {
            addElement("b3", "X");
            return;
          } else {
            addElement("b1", "X");
            return;
          }
        }
      } else if (count % 2 == 0) {
        if (winningStroke() === false) {
          if (defendStroke() === false) {
            var randomIndex = Math.floor(Math.random() * notTaken.length);
            addElement("b" + notTaken[randomIndex], "X");
            // console.log(randomIndex);
          }
        }
      }
    } else {
      // console.log("hello2");
      if (count == 0) {
        addElement("b" + firstTurnMatrix[firstTurnIndex], "X");
      } else if (count == 2) {
        //put in a corner
        var cornerIndex = Math.floor(Math.random() * corners.length);
        addElement("b" + corners[cornerIndex], "X");
      } else if (count % 2 == 0) {
        //first check whether center is taken or not

        //first check whether winning pattern or not
        if (winningStroke() === false) {
          if (defendStroke() === false) {
            if (document.querySelector(".b5") === "") {
              addElement("b5", "X");
            } else {
              var cornerIndex = Math.floor(Math.random() * corners.length);
              addElement("b" + corners[cornerIndex], "X");
            }
          }
        }
      }
    }
  }

  // when the user begins to play first
  if (playerTurn === 1) {
    if (atCenter) {
      // console.log("the user first gave at center");
      if (count == 1) {
        var cornerIndex = Math.floor(Math.random() * corners.length);
        addElement("b" + corners[cornerIndex], "X");
      } else if (count == 3) {
        if (defendStroke() === false) {
          var cornerIndex = Math.floor(Math.random() * corners.length);
          addElement("b" + corners[cornerIndex], "X");
        }
      } else if (count % 2 != 0) {
        if (winningStroke() === false) {
          if (defendStroke() == false) {
            var randomIndex = Math.floor(Math.random() * notTaken.length);
            addElement("b" + notTaken[randomIndex], "X");
          }
        }
      }
    } else if (atCorner) {
      if (count == 1) {
        addElement("b5", "X");
      } else if (count == 3) {
        if (defendStroke() === false) {
          var randomIndexOfmiddle = Math.floor(Math.random() * 4);
          addElement("b" + middles[randomIndexOfmiddle], "X");
        }
      } else if (count % 2 != 0) {
        if (winningStroke() === false) {
          if (defendStroke() == false) {
            var randomIndex = Math.floor(Math.random() * notTaken.length);
            addElement("b" + notTaken[randomIndex], "X");
          }
        }
      }
    } else if (atMiddle) {
      // console.log("the user first gave at middle");
      if (count == 1) {
        if (document.querySelector(".b2").innerHTML != "") {
          addElement("b1", "X");
        } else if (document.querySelector(".b4").innerHTML != "") {
          addElement("b7", "X");
        } else if (document.querySelector(".b6").innerHTML != "") {
          addElement("b3", "X");
        } else {
          addElement("b9", "X");
        }
      } else if (count == 3) {
        if (defendStroke() === false) {
          if (document.querySelector(".b5").innerHTML === "") {
            addElement("b5", "X");
          } else {
            var cornerIndex = Math.floor(Math.random() * corners.length);
            addElement("b" + corners[cornerIndex], "X");
          }
        }
      } else if (count % 2 != 0) {
        if (winningStroke() === false) {
          if (defendStroke() === false) {
            var randomIndex = Math.floor(Math.random() * notTaken.length);
            addElement("b" + notTaken[randomIndex], "X");
          }
        }
      }
    }
  }
}

function addElement(cellname, symbol) {
  //to remove that element from the notTaken array
  notTaken.splice(notTaken.indexOf(parseInt(cellname[1])), 1);
  console.log(notTaken);
  console.log("the turn is" + symbol + " " + cellname[1]);

  //the below code is to check that if a corner is selected it is removed from the corner array
  if (corners.includes(parseInt(cellname[1]))) {
    corners.splice(corners.indexOf(parseInt(cellname[1])), 1);
    console.log("corner");
  }
  if (gameover == 0) {
    // console.log(count);
    var cell = document.querySelector("." + cellname);

    if (symbol === "X" && cell.innerHTML == "") {
      cell.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      cell.classList.add("flicker");
      // setTimeout(() => {
      //   cell.classList.add("flicker");
      // }, 10);

      cell.setAttribute("value", "X");
      // console.log(cell.getAttribute("value"));
    } else if (symbol === "O" && cell.innerHTML == "") {
      cell.innerHTML = '<i class="fa-regular fa-circle"></i>';
      cell.setAttribute("value", "O");
    }

    //check whether all cells are full or not
    count++;
    if (count == 9) {
      // console.log("hi");
      refresh.classList.add("resizing");
      checkans();
      GameOver();
      return;
    }

    //this is to check where the user first gave and plan the action accordinly
    if (count === 1 && playerTurn === 1) {
      if (cellname[1] == 5) {
        atCenter = true;
      } else if (
        cellname[1] == 1 ||
        cellname[1] == 3 ||
        cellname[1] == 7 ||
        cellname[1] == 9
      ) {
        atCorner = true;
      } else {
        atMiddle = true;
      }
    }

    computerTurn();
    console.log("checkans is called");
    checkans();
  }
}

// this is to determine whether someone has won or not
function checkans() {
  winningmatrix.forEach(function (item) {
    if (
      document.querySelector(".b" + item[0]).getAttribute("value") ==
        document.querySelector(".b" + item[1]).getAttribute("value") &&
      document.querySelector(".b" + item[1]).getAttribute("value") ==
        document.querySelector(".b" + item[2]).getAttribute("value")
    ) {
      if (
        document.querySelector(".b" + item[0]).getAttribute("value") === "X"
      ) {
        console.log("X won");
        score1++;
        GameOver(item[0], item[1], item[2]);
        resizeAnimation(item[0], item[1], item[2]);

        console.log(item[0], item[1], item[2]);
      } else if (
        document.querySelector(".b" + item[0]).getAttribute("value") === "O"
      ) {
        console.log("Y won");
        score2++;
        GameOver(item[0], item[1], item[2]);
        resizeAnimation(item[0], item[1], item[2]);
      }
    }
  });
}

//winning stroke if there is a chance for the computer to win
function winningStroke() {
  for (var i = 0; i <= 7; i++) {
    var a = document
      .querySelector(".b" + winningmatrix[i][0])
      .getAttribute("value");
    var b = document
      .querySelector(".b" + winningmatrix[i][1])
      .getAttribute("value");
    var c = document
      .querySelector(".b" + winningmatrix[i][2])
      .getAttribute("value");
    if (
      (a == "X" && b == "X") ||
      (b == "X" && c == "X") ||
      (c == "X" && a == "X")
    ) {
      if (a === null) {
        addElement("b" + winningmatrix[i][0], "X");
        return true;
      } else if (b === null) {
        addElement("b" + winningmatrix[i][1], "X");
        return true;
      } else if (c === null) {
        addElement("b" + winningmatrix[i][2], "X");
        return true;
      }
    }
  }
  return false;
}

//defending the users attack
function defendStroke() {
  for (var i = 0; i <= 7; i++) {
    var a = document
      .querySelector(".b" + winningmatrix[i][0])
      .getAttribute("value");
    var b = document
      .querySelector(".b" + winningmatrix[i][1])
      .getAttribute("value");
    var c = document
      .querySelector(".b" + winningmatrix[i][2])
      .getAttribute("value");
    if (
      (a == "O" && b == "O") ||
      (b == "O" && c == "O") ||
      (c == "O" && a == "O")
    ) {
      if (a === null) {
        addElement("b" + winningmatrix[i][0], "X");
        return true;
      } else if (b === null) {
        addElement("b" + winningmatrix[i][1], "X");
        return true;
      } else if (c === null) {
        addElement("b" + winningmatrix[i][2], "X");
        return true;
      }
    }
  }
  return false;
}
function GameOver(item1, item2, item3) {
  // resizeAnimation(item1, item2, item3);
  player1.innerHTML = score1;
  player2.innerHTML = score2;
  gameover = 1;
  // playerTurn = playerTurn ^ 1;
}
function resizeAnimation(item1, item2, item3) {
  document.querySelector(".b" + item1).classList.add("resizing");
  document.querySelector(".b" + item2).classList.add("resizing");
  document.querySelector(".b" + item3).classList.add("resizing");
  refresh.classList.add("resizing");
}
function restart() {
  gameover = 0;

  for (var i = 1; i <= 9; i++) {
    if (document.querySelector(".b" + i).classList.contains("resizing")) {
      document.querySelector(".b" + i).classList.remove("resizing");
    }
    if (document.querySelector(".b" + i).classList.contains("flicker")) {
      document.querySelector(".b" + i).classList.remove("flicker");
    }
    document.querySelector(".b" + i).innerHTML = "";
    document.querySelector(".b" + i).removeAttribute("value");
  }
  refresh.classList.remove("resizing");
  playerTurn = playerTurn ^ 1;
  console.log(playerTurn);
  //reinitializing the values
  reinitialize();
  computerTurn();
}
function reinitialize() {
  notTaken = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  corners = [1, 3, 7, 9];
  middles = [2, 4, 6, 8];
  count = 0;
  atCenter = false;
  atCorner = false;
  atMiddle = false;
  firstTurnIndex = Math.floor(Math.random() * firstTurnMatrix.length);
  // console.log(firstTurnIndex);
}
