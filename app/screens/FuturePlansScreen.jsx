import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const futurePlansData = [
  {id: '1', plan: 'Build a weather app'},
  {id: '2', plan: 'Create a personal blog'},
  {id: '3', plan: 'Explore Redux for state management'},
];

const FuturePlansScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Future Plans</Text>
      <FlatList
        data={futurePlansData}
        renderItem={({item}) => (
          <Text style={styles.planItem}>{item.plan}</Text>
        )}
        keyExtractor={item => item.id}
      />
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
  planItem: {
    fontSize: 18,
    color: '#ccc',
    marginVertical: 5,
  },
});

export default FuturePlansScreen;
