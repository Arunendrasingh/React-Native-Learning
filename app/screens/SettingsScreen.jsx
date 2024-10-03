import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Dark Mode</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183153',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default SettingsScreen;
