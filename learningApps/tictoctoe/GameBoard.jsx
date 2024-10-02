import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BoardIcon from '../../components/BoardIcon';
import PropTypes from 'prop-types';

const GameBoard = ({route, navigation}) => {
  const initialBoard = () =>
    Array.from({length: 9}, (_, index) => {
      return {selected: null, selectedByPlayer: '', position: index + 1};
    });

  const {players} = route.params;
  const [board, setBoard] = useState(() => initialBoard());
  const [playerTurn, setPlayerTurn] = useState(players[0]);

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(initialBoard());
    setWinner(null);
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
    // New board

    if (selected != null) {
      return;
    }

    if (winner != null) {
      return;
    }

    let newBoard = board.map((item, index) => {
      if (currentPlayer === players[0] && selectedIndex === index) {
        return {...item, selected: 0, selectedByPlayer: currentPlayer};
      } else if (selectedIndex === index) {
        return {...item, selected: 1, selectedByPlayer: currentPlayer};
      }
      return item;
    });

    setBoard(newBoard);
    // Check the

    let currentWinner = getWinner(newBoard);
    console.log('Current Winner of the game', currentWinner);

    if (currentWinner) {
      setWinner(currentWinner);

      //   Navigate the user to win screen after 500ms

      setTimeout(() => {
        navigation.replace('GameResultScreen', {
          winner: currentWinner,
          players: players,
        });
      }, 500);
      return;
    }

    if (currentPlayer === players[0]) {
      setPlayerTurn(players[1]);
    } else {
      setPlayerTurn(players[0]);
    }
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

GameBoard.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      players: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};
