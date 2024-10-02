import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameBoard from './GameBoard';
import GameHomeScreen from './GameHomeScreen';

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#183153',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   gameContainer: {
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   boardContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: '90%',
//     aspectRatio: 1,
//     borderColor: 'black',
//     alignSelf: 'center',
//   },
//   boardItem: {
//     width: '33.33%',
//     height: '33.33%',
//     borderColor: 'gray',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resetButton: {
//     width: 200,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FF6F61',
//     borderRadius: 10,
//   },
//   text: {
//     color: '#ffffff',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
// });

export default TicTocToe;
