import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './app/learningApps/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AboutScreen from './app/screens/AboutScreen';
import FuturePlansScreen from './app/screens/FuturePlansScreen';
import LearningProgressScreen from './app/screens/LearningProgressScreen';
import SettingsScreen from './app/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function App() {
  // It contains main tab navigator
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{tabBarLabel: 'Home'}}
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
