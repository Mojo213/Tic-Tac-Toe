// Game Board Module
const gameBoardModule = (() => {
  const tileArray = [];

  function createTiles() {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('game-container');
    body.appendChild(container);
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
  const player1 = playerFactoryModule.createPlayer('player1', 'X');
  const player2 = playerFactoryModule.createPlayer('player2', 'O');
  let currentPlayer = player1;

  function playerTurn(gameTile, row, diagonal1, diagonal2, column) {
    for (let i = 0; i < gameTile.length; i++) {
      gameTile[i].addEventListener('click', (event) => {
        if (gameTile[i].textContent === '') {
          const clickedTile = event.target;
          clickedTile.textContent = currentPlayer.playerSymbol;

          if (
            gameLogicModule.checkRow(row, currentPlayer.playerSymbol) ||
            gameLogicModule.checkCross(diagonal1, currentPlayer.playerSymbol) ||
            gameLogicModule.checkCross(diagonal2, currentPlayer.playerSymbol) ||
            gameLogicModule.checkColumn(column, currentPlayer.playerSymbol)
          ) {
            console.log(`${currentPlayer.playerName} has three in a row`);
          } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            console.log(currentPlayer);
          }
        } else {
          console.log('Tile already has a value');
        }
      });
    }
  }

  return {
    playerTurn,
  };
})();

// Initialize the Game
gameBoardModule.createTiles();
const someGameTile = gameBoardModule.tileArray;
const row = gameBoardModule.tileArray;
const diagonal1 = [
  gameBoardModule.tileArray[0],
  gameBoardModule.tileArray[4],
  gameBoardModule.tileArray[8],
];
const diagonal2 = [
  gameBoardModule.tileArray[2],
  gameBoardModule.tileArray[4],
  gameBoardModule.tileArray[6],
];
const column = [
  gameBoardModule.tileArray[0],
  gameBoardModule.tileArray[3],
  gameBoardModule.tileArray[6],
  gameBoardModule.tileArray[1],
  gameBoardModule.tileArray[4],
  gameBoardModule.tileArray[7],
  gameBoardModule.tileArray[2],
  gameBoardModule.tileArray[5],
  gameBoardModule.tileArray[8],
];

gameControllerModule.playerTurn(someGameTile, row, diagonal1, diagonal2, column);
