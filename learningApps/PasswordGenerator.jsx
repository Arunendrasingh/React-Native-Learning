import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';
import * as yup from 'yup';




/*
First create a Input Box, then create a.
*/
const PasswordGenerator = () => {

  const getPasswordString = ({ upperCaseToggle, lowerCaseToggle, numberToggle, symbolToggle }) => {
    let passwordStr = '';

    let upperText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (upperCaseToggle) {
      passwordStr += upperText;
    }

    let lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    if (lowerCaseToggle) {
      passwordStr += lowerCase;
    }
    let number = '0123456789';
    console.log(numberToggle)
    if (numberToggle) {
      passwordStr += number;
    }
    let symbol = '!@#$%^&*()_+';
    if (symbolToggle) {
      passwordStr += symbol;
    }

    return passwordStr;

  };

  function createPassword(string, passwordLength) {
    let result = '1';

    for (let i = 0; i < passwordLength; i++) {
      let characterIndex = Math.round(Math.random() * string.length);
      result += string.charAt(characterIndex);
    }


    return result;
  }

  const getPassword = (values) => {
    const passwordString = getPasswordString(values);
    const password = createPassword(passwordString, values.passwordLength);
    console.log("Password str: ", password);
  };

  // TODO: Generate the password
  // !Write a method to get the password string to extract, then choose the random password till the length of password.
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
        validationSchema={yup.object({
          passwordLength: yup.number('Input must be number')
            .integer('length must be positive integer..')
            .max(12, 'must be less-than length 12..')
            .min(4, 'length must be grater than 4...')
            .required(),
        })}
        val
        onSubmit={values => getPassword(values)}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, touched, errors, resetForm }) => (<View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Password Length</Text>
            <TextInput value={values.passwordLength} placeholder="e.g. 8" onChangeText={handleChange('passwordLength')} keyboardType="numeric" style={styles.lengthInput} />
          </View>
          <View style={styles.displayError}>
            {touched.passwordLength && errors.passwordLength ? <Text style={styles.errorText}> {errors.passwordLength} </Text> : null}
          </View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Include Lower Case Letters</Text>
            <View>
              <BouncyCheckbox isChecked={values.upperCaseToggle} useBuiltInState={false} fillColor="green" onPress={(isChecked) => setFieldValue('upperCaseToggle', !isChecked)} />
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
              <BouncyCheckbox isChecked={values.numberToggle} fillColor="gray" useBuiltInState={false} onPress={(isChecked) => setFieldValue('numberToggle', !isChecked)} />
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
            <Button title="Generate Password" onPress={handleSubmit} />
            <Button title="Rest Password" color="gray" onPress={resetForm} />
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
  errorText: {
    color: 'crimson',
    padding: 10,
    fontSize: 15,
    fontWeight: 'semibold',
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

