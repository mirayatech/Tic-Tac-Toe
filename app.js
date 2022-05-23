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
