import React, {useState, useEffect, createElement} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import projectData from '../../assets/data/projectData.json'; // Import the JSON file
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicTocToe from './tictoctoe/TicTocToe';

const imageMapping = {
  'calculator.jpg': require('../../assets/images/calculator.jpg'),
  'weather.jpg': require('../../assets/images/weather.jpg'),
  'tictoctoe.jpg': require('../../assets/images/tictoctoe.jpg'),
  'taskmanager.png': require('../../assets/images/school.jpg'),
  'notesapp.png': require('../../assets/images/school.jpg'),
  'qrscanner.png': require('../../assets/images/school.jpg'),
};

const StackHome = createNativeStackNavigator();

const HomeScreen = () => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Load the project data from the JSON file
    setProjects(projectData);
  }, []);

  const renderProject = ({item, index}) => {
    const isEvenRow = index % 2 === 0; // Check if the row is even or odd for alternating layout
    return (
      <TouchableOpacity
        style={[
          styles.projectContainer,
          isEvenRow ? styles.evenRow : styles.oddRow,
        ]}
        onPress={() => navigation.navigate(item.routeName)} // Navigate to the project's route
      >
        <View style={styles.imageContainer}>
          <Image
            source={imageMapping[item.image]}
            style={styles.projectImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.projectDetails}>
          <Text style={styles.projectTitle}>{item.title}</Text>
          <Text style={styles.projectDescription}>{item.description}</Text>
          <Text style={styles.projectDate}>Last Updated: {item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* <StackHome.Navigator>
        <StackHome.Screen name="TicTocToeGame" component={TicTocToe} />
      </StackHome.Navigator> */}
      <View style={styles.container}>
        <Text style={styles.heading}>My Projects</Text>
        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item, index) => `${item.title}-${index}`}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // Light theme background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#183153',
    textAlign: 'center',
  },
  projectContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    alignItems: 'center',
  },
  evenRow: {
    flexDirection: 'row', // Image on the left
  },
  oddRow: {
    flexDirection: 'row-reverse', // Image on the right
  },
  projectImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  projectDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183153',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  projectDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
});

export default HomeScreen;
