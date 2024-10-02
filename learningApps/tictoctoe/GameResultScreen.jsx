import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const GameResultScreen = ({route, navigation}) => {
  const {winner, players} = route.params; // Winner name passed from GameBoard
  console.log('Winner name: ', winner);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!</Text>

      {/* Display the winner name */}
      <Text style={styles.winnerText}>{winner} Wins!</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Game', {players: players})}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

GameResultScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      winner: PropTypes.string.isRequired,
      players: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183153', // Main background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winnerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50', // A contrasting color for the buttons
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameResultScreen;
