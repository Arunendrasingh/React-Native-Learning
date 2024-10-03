import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {GameRecordContext} from '../../context/GameRecordContext';

const GameHomeScreen = ({navigation}) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const {gameRecords} = useContext(GameRecordContext);

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

GameHomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GameHomeScreen;
