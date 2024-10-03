import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About This App</Text>
      <Text style={styles.description}>
        This app showcases various projects developed as part of my learning
        journey in mobile development.
      </Text>
      <Text style={styles.subHeading}>Technologies Used:</Text>
      <Text style={styles.techStack}>
        React Native, Expo, JavaScript, and more...
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
  description: {
    fontSize: 16,
    color: '#ccc',
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
  },
  techStack: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default AboutScreen;
