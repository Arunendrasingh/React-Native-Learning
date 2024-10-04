import React, {useContext, useEffect, useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BoardIcon from '../../components/BoardIcon';
import PropTypes from 'prop-types';
import {GameRecordContext} from '../../context/GameRecordContext';

const GameBoard = ({route, navigation}) => {
  const initialBoard = () =>
    Array.from({length: 9}, (_, index) => {
      return {selected: null, selectedByPlayer: '', position: index + 1};
    });

  // Traverse the tab Navigator the hide it.
  console.log(
    "Current Navigation's Parent' Parent: ",
    navigation.getParent('TopHomeNav'),
  );

  useEffect(() => {
    const tabNavigator = navigation.getParent('TopHomeNav');

    if (tabNavigator) {
      tabNavigator.setOptions({
        tabBarStyle: {display: 'none'},
      });
    }

    return () => {
      if (tabNavigator) {
        tabNavigator.setOptions({
          tabBarStyle: {display: 'flex'},
        });
      }
    };
  }, [navigation]);

  const {setGameRecords} = useContext(GameRecordContext);
  const {players} = route.params;
  const [board, setBoard] = useState(() => initialBoard());
  const [playerTurn, setPlayerTurn] = useState(players[0]);

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(initialBoard());
    setWinner(null);

    // I can update the state of the winner player with loser. I am not using any storage facility right now.
    setPlayerTurn(players[0]);
  };

  function getWinner(currentBoard) {
    let winnerName;

    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Diagonal
    ];

    for (const [a, b, c] of winningCombinations) {
      const player = currentBoard[a].selectedByPlayer;
      // Check that the selectedByPlayer is not empty and matches in all three positions
      if (
        player &&
        player === currentBoard[b].selectedByPlayer &&
        player === currentBoard[c].selectedByPlayer
      ) {
        winnerName = player;
        break;
      }
    }

    return winnerName;
  }

  const setSelectedPlayOnBoard = (selected, currentPlayer, selectedIndex) => {
    if (selected !== null || winner !== null) {
      return;
    }

    const newBoard = board.map((item, index) =>
      index === selectedIndex
        ? {
            ...item,
            selected: currentPlayer === players[0] ? 0 : 1,
            selectedByPlayer: currentPlayer,
          }
        : item,
    );

    setBoard(newBoard);

    const allFilled = newBoard.every(item => item.selected !== null);

    if (allFilled) {
      setWinner('Draw');
      setGameRecords(item => [
        ...item,
        {player: players[0], status: 'Draw'},
        {player: players[1], status: 'Draw'},
      ]);
      setTimeout(() => {
        navigation.replace('GameResultScreen', {
          winner: 'Draw',
          players: players,
        });
      }, 1000);
      return;
    }

    const currentWinner = getWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);

      setGameRecords(item => [
        ...item,
        {player: currentWinner, status: 'Win'},
        {
          player: currentWinner === players[0] ? players[1] : players[0],
          status: 'Lose',
        },
      ]);
      setTimeout(() => {
        navigation.replace('GameResultScreen', {
          winner: currentWinner,
          players: players,
        });
      }, 1000);
      return;
    }

    setPlayerTurn(players[0] === currentPlayer ? players[1] : players[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Text style={styles.text}>
          {winner === null ? `${playerTurn}'s turn` : `${winner} win the game.`}
        </Text>
        <View style={styles.boardContainer}>
          {board.map(({selected, position}, index) => (
            <BoardIcon
              key={position}
              index={index}
              selected={selected}
              setSelected={setSelectedPlayOnBoard}
              playerTurn={playerTurn}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset the Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183153',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  gameContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    aspectRatio: 1,
    borderColor: 'black',
    alignSelf: 'center',
  },
  boardItem: {
    width: '33.33%',
    height: '33.33%',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F61',
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default GameBoard;

// GameBoard.propTypes = {
//   route: PropTypes.shape({
//     params: PropTypes.shape({
//       players: PropTypes.arrayOf(PropTypes.string).isRequired,
//     }).isRequired,
//   }).isRequired,
//   navigation: PropTypes.shape({
//     replace: PropTypes.func.isRequired,
//   }).isRequired,
// };
