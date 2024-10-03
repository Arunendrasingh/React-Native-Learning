import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameBoard from './GameBoard';
import GameHomeScreen from './GameHomeScreen';
import GameResultScreen from './GameResultScreen';
import {GameRecordProvider} from '../../context/GameRecordContext';

const Stack = createNativeStackNavigator();

// Now use Context API

/*
1. Create a context.
2. Up the state : const [gameRecords, setGameRecords] = useState([]);
3. Use state from context in GameHomeScreen and set it from GameBoard
*/

const TicTocToe = () => {
  return (
    <GameRecordProvider>
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
        <Stack.Screen name="GameResultScreen" component={GameResultScreen} />
      </Stack.Navigator>
    </GameRecordProvider>
  );
};

export default TicTocToe;
