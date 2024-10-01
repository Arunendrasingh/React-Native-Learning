import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import GameBoard from './learningApps/TicTocToe';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GameBoard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
