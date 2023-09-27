const gameModule = (() => {

    const gameBoard = {
      tileArray: [],
      createTiles: () => {
        const body = document.querySelector('body');
        const container = document.createElement('div');
        container.classList.add('game-container');
        body.appendChild(container);
        for (let i = 0; i < 9; i++) {
          const gameTile = document.createElement('div');
          gameTile.classList.add('game-tile');
          gameTile.id = `tile${i}`;
          container.appendChild(gameTile);
          gameBoard.tileArray.push(gameTile);
          
        }
        
      }
    };
  
    return {
      gameBoard,
    };
  })();
  
  gameModule.gameBoard.createTiles(); 
  console.log(gameModule.gameBoard.tileArray)

const playerFactory = ( function () {
function CreatePlayer (name, symbol) {
    const playerName = name;
    const playerSymbol = symbol;   
 return {
    playerName,
    playerSymbol,
 }
}
 return {
  CreatePlayer,
 }
})();

let player1 = playerFactory.CreatePlayer('player1', 'X');
let player2 = playerFactory.CreatePlayer('player2', 'O')

console.log(player1.playerName, player1.playerSymbol);
console.log(player2.playerName, player2.playerSymbol); 

let currentPlayer = player1;

function playerTurn(gameTile, row, diagonal1, diagonal2) {
  for (let i = 0; i < gameTile.length; i++) {
    gameTile[i].addEventListener('click', (event) => {
      if (gameTile[i].textContent === '') {
        const clickedTile = event.target;
        clickedTile.textContent = currentPlayer.playerSymbol;

        if (GameLogic.checkRow(row, currentPlayer.playerSymbol) || 
            GameLogic.checkCross(diagonal1, currentPlayer.playerSymbol) || 
            GameLogic.checkCross(diagonal2, currentPlayer.playerSymbol)) {
          console.log(`${currentPlayer.playerName} has three in a row`);
        } else {
          currentPlayer = (currentPlayer === player1) ? player2 : player1;
          console.log(currentPlayer);
        }
      } else {
        console.log('Tile already has a value');
      }
    });
  }
}

const GameLogic = (function () {
  function checkRow(row, symbol) {
    let count = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i].textContent === symbol) {
        count++;
      } else {
        count = 0; 
      }
      if (count === 3) {
        return true; 
      }
    }
    return false; 
  }

  function checkCross (cross, symbol){
    let count = 0;
    for (let i = 0; i < cross.length; i++) {
      if (cross[i].textContent === symbol) {
        count++;
      } else {
        count = 0; 
      }
      if (count === 3) {
        return true; 
      }
    }
    return false; 

  }

  return {
    checkRow,
    checkCross,
  };
})();




const someGameTile = gameModule.gameBoard.tileArray;
const row = gameModule.gameBoard.tileArray;
const diagonal1 = [
  gameModule.gameBoard.tileArray[0],
  gameModule.gameBoard.tileArray[4],
  gameModule.gameBoard.tileArray[8]
];

const diagonal2 = [
  gameModule.gameBoard.tileArray[2],
  gameModule.gameBoard.tileArray[4],
  gameModule.gameBoard.tileArray[6]
];

playerTurn(someGameTile, row, diagonal1, diagonal2);








