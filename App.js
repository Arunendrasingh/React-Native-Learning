import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AboutScreen from './app/screens/AboutScreen';
import FuturePlansScreen from './app/screens/FuturePlansScreen';
import LearningProgressScreen from './app/screens/LearningProgressScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import HomeScreenStackNavigator from './app/learningApps/HomeScreen';

const Tab = createBottomTabNavigator();

function App() {
  // It contains main tab navigator
  return (
    <NavigationContainer>
      <Tab.Navigator id="TopHomeNav">
        <Tab.Screen
          name="Home"
          component={HomeScreenStackNavigator}
          options={{headerShown: false, tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{tabBarLabel: 'About'}}
        />
        <Tab.Screen
          name="FuturePlans"
          component={FuturePlansScreen}
          options={{tabBarLabel: 'Future Plans'}}
        />
        <Tab.Screen
          name="LearningProgress"
          component={LearningProgressScreen}
          options={{tabBarLabel: 'Learning'}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{tabBarLabel: 'Settings'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
