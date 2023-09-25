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
 
