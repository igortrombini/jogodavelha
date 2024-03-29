import { useEffect, useState } from 'react';
import './App.css';

const winningCombinations = [
  //horizontal
  { indexes: [0, 1, 2], orientation: 'horizontal' },
  { indexes: [3, 4, 5], orientation: 'horizontal' },
  { indexes: [6, 7, 8], orientation: 'horizontal' },

  //vertical
  { indexes: [0, 3, 6], orientation: 'vertical' },
  { indexes: [1, 4, 7], orientation: 'vertical' },
  { indexes: [2, 5, 8], orientation: 'vertical' },

  //diagonals
  { indexes: [0, 4, 8], orientation: 'diagonal-1' },
  { indexes: [2, 4, 6], orientation: 'diagonal-2' },

];

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState(null);

  const handleClick = (clickedIndex) => {
    console.log(clickedIndex)

    if (gameData[clickedIndex] != 0) {
      return;
    }
    if (winningCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;
      return newGameData;
    })

    setTurn((prev) => (
      prev === 1 ? 2 : 1
    ));

  };

  useEffect(() => {
    checkWinner();
    checkGameEnded();
  }, [gameData]);

  useEffect(() => {
    if (winningCombo) {
      alert('Jogo teve um vencedor!.')
    }

  }, [winningCombo]);

  const checkGameEnded = () => {
    if (gameData.every((item) => item !== 0)) {
      alert('jogo acabou, deu velha');
    }
  };

  const checkWinner = () => {
    console.log('cheking winner')
    let winner = null;

    for (let combination of winningCombinations) {
      const { indexes } = combination;
      console.log(gameData);


      if (
        gameData[indexes[0]] == 1 &&
        gameData[indexes[1]] == 1 &&
        gameData[indexes[2]] == 1
      ) {
        winner = 'player 1';
      } if (
        gameData[indexes[0]] == 2 &&
        gameData[indexes[1]] == 2 &&
        gameData[indexes[2]] == 2
      ) {
        winner = 'player 2';
      }
      if (winner) {
        setWinningCombo(combination);
        break;
      }

    }
    console.log({ winner });
  };

  const restartGame = () => {
    setGameData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setTurn(1);
    setWinningCombo(null);
  }

  return (
    <div className='board-game'>
      {gameData.map((value, index) => (
        <span onClick={() => {
          handleClick(index);
        }}
          key={index}
          className={
            winningCombo?.indexes.includes(index)
              ? winningCombo.orientation
              : undefined
          }
        >
          {/* <abbr title=''>{index}</abbr> Comentando esta linha para ocultar o índice */}
          {value === 1 && '❌'}
          {value === 2 && '⭕'}
        </span>
      ))}
      <div>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;
