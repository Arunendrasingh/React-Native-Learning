import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LearningProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Learning Progress</Text>
      <Text style={styles.progressItem}>
        Completed: React Navigation Basics
      </Text>
      <Text style={styles.progressItem}>
        Currently Learning: State Management with Redux
      </Text>
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
  progressItem: {
    fontSize: 18,
    color: '#ccc',
    marginVertical: 5,
  },
});

export default LearningProgressScreen;
