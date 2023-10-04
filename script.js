// Game Board Module
const gameBoardModule = (() => {
  const tileArray = [];

  function createTiles() {
    const gameBoardContainer = document.querySelector('.gameBoardContainer');
    const container = document.createElement('div');
    container.classList.add('game-container');
    gameBoardContainer.appendChild(container);
    for (let i = 0; i < 9; i++) {
      const gameTile = document.createElement('div');
      gameTile.classList.add('game-tile');
      gameTile.id = `tile${i}`;
      container.appendChild(gameTile);
      tileArray.push(gameTile);
    }
  }

  return {
    createTiles,
    tileArray,
  };
})();

// Player Factory Module
const playerFactoryModule = (() => {
  function createPlayer(name, symbol) {
    const playerName = name;
    const playerSymbol = symbol;
    return {
      playerName,
      playerSymbol,
    };
  }

  return {
    createPlayer,
  };
})();

// Game Logic Module
const gameLogicModule = (() => {

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
  

  function checkCross(cross, symbol) {
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

  function checkColumn(column, symbol) {
    let count = 0;
    for (let i = 0; i < column.length; i++) {
      if (column[i].textContent === symbol) {
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
    checkColumn,
  };
})();

// Game Controller Module
const gameControllerModule = (() => {
  const player1 = playerFactoryModule.createPlayer('Player1', 'X');
  const player2 = playerFactoryModule.createPlayer('Player2', 'O');
  let currentPlayer = player1;

  function playerTurn(gameTile, row1, row2, row3, diagonal1, diagonal2, column1, column2, column3) {
    let moves = 0;
  
    for (let i = 0; i < gameTile.length; i++) {
      gameTile[i].addEventListener('click', (event) => {
        if (gameTile[i].textContent === '') {
          const clickedTile = event.target;
          clickedTile.textContent = currentPlayer.playerSymbol;
          moves++;
  
          if (
            gameLogicModule.checkRow(row1, currentPlayer.playerSymbol)||
            gameLogicModule.checkRow(row2, currentPlayer.playerSymbol)||
            gameLogicModule.checkRow(row3, currentPlayer.playerSymbol)||
            gameLogicModule.checkCross(diagonal1, currentPlayer.playerSymbol)||
            gameLogicModule.checkCross(diagonal2, currentPlayer.playerSymbol)||
            gameLogicModule.checkColumn(column1, currentPlayer.playerSymbol)||
            gameLogicModule.checkColumn(column2, currentPlayer.playerSymbol)||
            gameLogicModule.checkColumn(column3, currentPlayer.playerSymbol)
            ) {
            alertWin.showCustomAlert(`${currentPlayer.playerName} ${currentPlayer.playerSymbol} has won`);
          } else if (moves === 9) {
            alertWin.showCustomAlert('It\'s a tie!');
          } else {
            currentPlayer.playerName, currentPlayer.playerSymbol;
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            currentPlayer.playerName, currentPlayer.playerSymbol;
          }
        } else {
          alertWin.showCustomAlert('Tile already has a value');
        }
      });
    }
  }
  
  

  return {
    playerTurn,
  };
})();

// Custom Alert Module 
const alertWin = (function() {
  const customAlert = document.getElementById('customAlert');
  const winnerMessage = document.getElementById('winnerMessage');
  const closeBtn = document.getElementById('closeBtn');
  const newGame = document.getElementById('newGame');

  closeBtn.addEventListener('click', () => {
    customAlert.style.display = 'none';
  });

  newGame.addEventListener('click', () => {
    window.location.reload();
  })

  function showCustomAlert(message) {
    winnerMessage.textContent = message;
    customAlert.style.display = 'flex';
  }

  function closeCustomAlert() {
    customAlert.style.display = 'none'; 
  }

  return {
    showCustomAlert,
    closeCustomAlert,
  };
})();



// Initialize the Game
gameBoardModule.createTiles();

const winConditions = [
  gameBoardModule.tileArray.slice(0, 3), // Rows
  gameBoardModule.tileArray.slice(3, 6),
  gameBoardModule.tileArray.slice(6),
  [gameBoardModule.tileArray[0], gameBoardModule.tileArray[3], gameBoardModule.tileArray[6]], // Columns
  [gameBoardModule.tileArray[1], gameBoardModule.tileArray[4], gameBoardModule.tileArray[7]],
  [gameBoardModule.tileArray[2], gameBoardModule.tileArray[5], gameBoardModule.tileArray[8]],
  [gameBoardModule.tileArray[0], gameBoardModule.tileArray[4], gameBoardModule.tileArray[8]], // Diagonals
  [gameBoardModule.tileArray[2], gameBoardModule.tileArray[4], gameBoardModule.tileArray[6]],
];

gameControllerModule.playerTurn(gameBoardModule.tileArray, ...winConditions);
 
