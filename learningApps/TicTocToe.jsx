import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons/faCircleXmark';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

// GameHomeScreen component
const GameHomeScreen = ({navigation}) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const [gameRecords, setGameRecords] = useState([]);

  // Function to handle the start of the game
  const startGame = () => {
    navigation.navigate('Game', {players: [player1, player2]});
    setPlayer1('');
    setPlayer2('');
  };

  const renderRecord = ({item}) => (
    <View style={gameHomeStyles.recordRow}>
      <Text style={gameHomeStyles.recordPlayer}>{item.player}</Text>
      <Text
        style={[
          gameHomeStyles.recordStatus,
          // Set the color based on the status of the game
          item.status === 'Win'
            ? gameHomeStyles.win
            : item.status === 'Lose'
            ? gameHomeStyles.lose
            : gameHomeStyles.draw,
        ]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={gameHomeStyles.container}>
      {/* Title */}
      <Text style={gameHomeStyles.title}>Tic-Tac-Toe Game</Text>

      {/* Player Input Section */}
      <View style={gameHomeStyles.playerInputContainer}>
        <Text style={gameHomeStyles.label}>Enter Player Names</Text>
        <TextInput
          style={gameHomeStyles.input}
          placeholder="Player 1 Name"
          placeholderTextColor="#ccc"
          value={player1}
          onChangeText={setPlayer1}
        />
        <TextInput
          style={gameHomeStyles.input}
          placeholder="Player 2 Name"
          placeholderTextColor="#ccc"
          value={player2}
          onChangeText={setPlayer2}
        />
        {/* Start Game Button */}
        <TouchableOpacity
          style={[
            gameHomeStyles.button,
            (player1 === '' || player2 === '') && gameHomeStyles.disabledButton,
          ]}
          onPress={startGame}
          disabled={player1 === '' || player2 === ''}>
          <Text style={gameHomeStyles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>

      {/* Game Record Section */}
      <View style={gameHomeStyles.recordContainer}>
        <Text style={gameHomeStyles.label}>Game Records</Text>
        {gameRecords.length === 0 ? (
          <Text style={gameHomeStyles.noRecordsText}>
            No records available. Start playing to see the results!
          </Text>
        ) : (
          <View
            style={gameHomeStyles.scrollView}
            contentContainerStyle={gameHomeStyles.scrollViewContent}>
            <FlatList
              data={gameRecords}
              renderItem={renderRecord}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const GameBoard = ({route}) => {
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

function BoardIcon({index, selected, setSelected, playerTurn}) {
  const iconToggle = () => {
    console.log('Icons is selected at index: ', index, playerTurn);
    setSelected(selected, playerTurn, index);
  };

  const getIcon = () => {
    if (selected === null) {
      return (
        <FontAwesomeIcon icon={faPencil} size={35} style={styleIcon.pencil} />
      );
    } else if (selected === 0) {
      return (
        <FontAwesomeIcon
          icon={faCircle}
          size={40}
          style={styleIcon.circleXMark}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faCircleXmark}
          size={40}
          style={styleIcon.circle}
        />
      );
    }
  };
  return (
    <View style={getCellStyle(index)}>
      <Pressable onPress={iconToggle}>{getIcon()}</Pressable>
    </View>
  );
}
const Stack = createNativeStackNavigator();

const TicTocToe = () => {
  return (
    <Stack.Navigator headerTitleAlign="center">
      <Stack.Screen
        name="Home"
        component={GameHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Game"
        component={GameBoard}
        options={{
          headerTransparent: true,
          headerBlurEffect: 'dark',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff',
          },
          headerBackTitleStyle: {
            color: '#fff',
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
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

const styleIcon = StyleSheet.create({
  pencil: {
    color: '#FFD43B',
  },
  circle: {
    color: '#63E6BE',
  },
  circleXMark: {color: '#B197FC'},
});

const gameHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183153',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  playerInputContainer: {
    backgroundColor: '#1C416C',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2C598A',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  recordContainer: {
    marginTop: 30,
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recordPlayer: {
    fontSize: 16,
    color: '#fff',
  },
  recordStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  win: {
    color: '#4CAF50',
  },
  lose: {
    color: '#FF3B30',
  },
  draw: {
    color: '#FFA500',
  },
  noRecordsText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollView: {
    maxHeight: 200, // Set a max height for the scrollable area
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#888', // Greyed-out color for disabled button
    opacity: 0.6, // Lower opacity to indicate disabled state
  },
});

export default TicTocToe;
export {GameBoard};
