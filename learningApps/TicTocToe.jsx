import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons/faCircleXmark';

const getCellStyle = index => {
  const baseStyle = {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const borderStyle = {
    borderTopWidth: index < 3 ? 0 : 1,
    borderLeftWidth: index % 3 === 0 ? 0 : 1,
    borderRightWidth: index % 3 === 2 ? 0 : 1,
    borderBottomWidth: index > 5 ? 0 : 1,
  };

  return {...baseStyle, ...borderStyle};
};

/*************  ✨ Codeium Command 🌟  *************/
/**
 * Tic Tac Toe game component.
 *
 * @return {JSX.Element} Tic Tac Toe game component.
 */
const TicTocToe = () => {
  /**
   * Creates an initial game board with 9 empty positions.
   *
   * @return {Array} An array of objects representing the game board positions.
   */
  const initialBoard = () =>
    Array.from({length: 9}, (_, index) => {
      return {selected: null, selectedByPlayer: '', position: index + 1};
    });

  /**
   * The two players in the game.
   */
  const players = ['Tom', 'Jerry'];
  // We assume true means player 1 and true means player 2

  /**
   * The current game board.
   */
  const [board, setBoard] = useState(() => initialBoard());
  /**
   * The player who is currently playing.
   */

  const [playerTurn, setPlayerTurn] = useState(players[0]);

  /**
   * The winner of the game.
   */
  const [winner, setWinner] = useState(null);

  /**
   * Resets the game to the initial state.
   */
  const resetGame = () => {
    setBoard(initialBoard());
    setWinner(null);
    setPlayerTurn(players[0]);
  };

  /**
   * Finds the winner of the game based on the current board.
   *
   * @param {Array} currentBoard The current game board.
   * @return {String} The winner of the game or null if there is no winner.
   */
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

  /**
   * Sets the selected play on the game board.
   *
   * @param {Number} selected The selected play (0 for player 1, 1 for player 2, null for empty).
   * @param {String} currentPlayer The current player.
   * @param {Number} selectedIndex The index of the selected play on the board.
   */
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
      <View>
        <Text>This is a Header Text</Text>
      </View>
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
/******  91840191-2b52-46a7-b53a-827aa40a3679  *******/

function BoardIcon({index, selected, setSelected, playerTurn}) {
  const iconToggle = () => {
    console.log('Icons is selected at index: ', index, playerTurn);
    setSelected(selected, playerTurn, index);
  };
  return (
    <View style={getCellStyle(index)}>
      <Pressable onPress={iconToggle}>
        {selected === null ? (
          <FontAwesomeIcon icon={faPencil} size={35} style={styleIcon.pencil} />
        ) : selected === 0 ? (
          <FontAwesomeIcon
            icon={faCircle}
            size={40}
            style={styleIcon.circleXMark}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleXmark}
            size={40}
            style={styleIcon.circle}
          />
        )}
      </Pressable>
    </View>
  );
}

export default TicTocToe;

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

const styleIcon = StyleSheet.create({
  pencil: {
    color: '#FFD43B',
  },
  circle: {
    color: '#63E6BE',
  },
  circleXMark: {color: '#B197FC'},
});
