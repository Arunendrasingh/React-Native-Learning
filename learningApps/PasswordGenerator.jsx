import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Formic from 'formic';




/*
First create a Input Box, then create a.
*/
const PasswordGenerator = () => {
  const [length, setLength] = useState('');

  const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
  const [upperCaseChecked, setUpperCaseChecked] = useState(false);
  const [numberChecked, setNumberChecked] = useState(false);
  const [symbolChecked, setSymbolChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password Generator</Text>
      <View style={styles.flexView}>
        <Text style={styles.text}>Password Length</Text>
        <TextInput value={length} placeholder="e.g. 8" onChangeText={setLength} keyboardType="numeric" style={styles.lengthInput} />
      </View>
      <View style={styles.flexView}>
        <Text style={styles.text}>Include Lower Case Letters</Text>
        <View>
          <BouncyCheckbox isChecked={lowerCaseChecked} useBuiltInState={false} fillColor="green" onPress={() => setLowerCaseChecked(!lowerCaseChecked)} />
        </View>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.text}>Include Upper Case Letters</Text>
        <View>
          <BouncyCheckbox isChecked={upperCaseChecked} fillColor="red"  useBuiltInState={false} onPress={() => setUpperCaseChecked(!upperCaseChecked)} />
        </View>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.text}>Include Numbers</Text>
        <View>
          <BouncyCheckbox isChecked={numberChecked} fillColor="gray"  useBuiltInState={false} onPress={() => setNumberChecked(!numberChecked)} />
        </View>
      </View>
      <View style={styles.flexView}>
        <Text style={styles.text}>Include Symbols</Text>
        <View>
          <BouncyCheckbox isChecked={symbolChecked} fillColor="orange"  useBuiltInState={false} onPress={() => setSymbolChecked(!symbolChecked)} />
        </View>
      </View>
      {/* Button View */}
      <View style={styles.buttonContainer}>
        {/* TODO: Write button code to generate the password and also button to rest the form */}
        {/* Practice the bouncy checkbox button to show the when button is pressed or not. */}
        <Button title="Generate Password" />
        <Button title="Rest Password" color="gray" />
      </View>
    </View>
  );
};

export default PasswordGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363736',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  flexView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  lengthInput: {
    borderColor: '#ffffff',
    color: '#ffffff',
    height: 50,
    borderWidth: 1,
    width: 150,
    padding: 15,
    borderRadius: 5,
  },
  header: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

