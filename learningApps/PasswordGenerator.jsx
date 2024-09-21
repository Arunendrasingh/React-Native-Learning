import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';




/*
First create a Input Box, then create a.
*/
const PasswordGenerator = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password Generator</Text>
      <Formik initialValues={{
        passwordLength: 0,
        upperCaseToggle: false,
        lowerCaseToggle: false,
        numberToggle: false,
        symbolToggle: false,
      }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (<View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Password Length</Text>
            <TextInput value={values.passwordLength} placeholder="e.g. 8" onBlur={handleBlur('passwordLength')} onChangeText={handleChange('passwordLength')} keyboardType="numeric" style={styles.lengthInput} />
          </View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Include Lower Case Letters</Text>
            <View>
              <BouncyCheckbox isChecked={values.upperCaseToggle} useBuiltInState={false} fillColor="green" onPress={(isChecked) => setFieldValue('upperCaseToggle', !isChecked)}/>
            </View>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Include Upper Case Letters</Text>
            <View>
              <BouncyCheckbox isChecked={values.lowerCaseToggle} fillColor="red" useBuiltInState={false} onPress={(isChecked) => setFieldValue('lowerCaseToggle', !isChecked)} />
            </View>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Include Numbers</Text>
            <View>
              <BouncyCheckbox isChecked={values.numberChecked} fillColor="gray" useBuiltInState={false} onPress={(isChecked) => setFieldValue('numberChecked', !isChecked)} />
            </View>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Include Symbols</Text>
            <View>
              <BouncyCheckbox isChecked={values.symbolToggle} fillColor="orange" useBuiltInState={false} onPress={(isChecked) => setFieldValue('symbolToggle', !isChecked)} />
            </View>
          </View>
          {/* Button View */}
          <View style={styles.buttonContainer}>
            {/* TODO: Write button code to generate the password and also button to rest the form */}
            {/* Practice the bouncy checkbox button to show the when button is pressed or not. */}
            <Button title="Generate Password" onPress={handleSubmit} />
            <Button title="Rest Password" color="gray" />
          </View>
        </View>)}
      </Formik>
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

