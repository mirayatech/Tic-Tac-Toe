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