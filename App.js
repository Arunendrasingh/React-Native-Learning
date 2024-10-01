import React from 'react';

import TicTocToe, {GameBoard} from './learningApps/TicTocToe';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <TicTocToe />
    </NavigationContainer>
  );
}
export default App;
