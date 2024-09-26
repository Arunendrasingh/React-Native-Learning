import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import TicTocToe from './learningApps/TicTocToe';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TicTocToe />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
