// Selectors
const selectBox = document.querySelector(".select-box"),
  selectBtnX = selectBox.querySelector(".options .playerX"),
  selectBtnO = selectBox.querySelector(".options .playerO"),
  playBoard = document.querySelector(".play-board"),
  players = document.querySelector(".players"),
  allBox = document.querySelectorAll("section span"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");
let playerXIcon = "fas fa-times",
  playerOIcon = "far fa-circle",
  playerSign = "X",
  runBot = true;

// Once window is loaded
window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
};
// hide selectbox & show playground on Player-X button clicked
selectBtnX.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
};
// hide selectbox & show playground on Player-O button clicked
selectBtnO.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  // add three class name in player element
  players.setAttribute("class", "players active player");
};

// Function - User Click
function clickedBox(element) {
  if (players.classList.contains("player")) {
    // Player select 'O', change the playerSign value to 'O'
    playerSign = "O";
    // adding O-Icon inside user clicked element
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  } else {
    // adding X-Icon inside user clicked element
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }
  //calling the winner function
  selectWinner();
  // user cannot select any other box until box select
  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";
  // generating random time delay so bot will delay randomly
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
    // passing random delay time
  }, randomTimeDelay);
}
// Function - Bot click
function bot() {
  let array = [];
  if (runBot) {
    playerSign = "O"; // first change the playerSign... so if user has X value in id then bot will have O
    for (let i = 0; i < allBox.length; i++) {
      // if span has no child element
      if (allBox[i].childElementCount == 0) {
        // inserting or unselected boxes inside array means that span has o children
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    // getting random index from array so bot will select random unselected box
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        // adding X inside user clicked element
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        allBox[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        // adding O inside user clicked element
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    // cant select the same box as bot selected
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    // passing the x value
    playerSign = "X";
  }
}
// Function - Select Winner
function getIdVal(classname) {
  // returning id name
  return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign) {
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
}
function selectWinner() {
  // if one combination of them matched then select the winner
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    // Once match won by someone, bot will stop
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700);
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
  } else {
    // check id: if all span has a id, the match is a drawn
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700);
      wonText.textContent = "Match has been drawn!";
    }
  }
}
