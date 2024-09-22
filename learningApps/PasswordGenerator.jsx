// import Clipboard from '@react-native-clipboard/clipboard';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';
import * as yup from 'yup';
import Clipboard from '@react-native-clipboard/clipboard';




/*
First create a Input Box, then create a.
*/
const PasswordGenerator = () => {

  const [password, setPassword] = useState(null);

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
    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      let characterIndex = Math.round(Math.random() * string.length);
      result += string.charAt(characterIndex);
    }


    return result;
  }

  const getPassword = (values) => {
    const passwordString = getPasswordString(values);
    const generatedPassword = createPassword(passwordString, values.passwordLength);
    setPassword(generatedPassword);
  };

  function copyToClipboard() {
    Clipboard.setString(password);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password Generator</Text>
      <View>
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
            upperCaseToggle: yup.boolean(),
            lowerCaseToggle: yup.boolean(),
            numberToggle: yup.boolean(),
            symbolToggle: yup.boolean(),
          }).test('at_least_one_toggle', function (value) {
            const { upperCaseToggle, lowerCaseToggle, numberToggle, symbolToggle } = value || {};
            if (!upperCaseToggle && !lowerCaseToggle && !numberToggle && !symbolToggle) {
              return this.createError({ path: this.type, message: 'At least one character type must be selected.' });
            }
            return true;
          })}
          onSubmit={values => {
            getPassword(values);
          }}
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

            {/* Error view to select at lease on case */}
            <View style={styles.displayError}>
              {errors.at_least_one_toggle &&
                <Text style={styles.errorText}> {errors.at_least_one_toggle} </Text>}
            </View>
            {/* Button View */}
            <View style={styles.buttonContainer}>
              <Button title="Generate Password" onPress={handleSubmit} />
              <Button title="Rest Password" color="gray" onPress={() => {
                resetForm();
                setPassword(null);
              }} />
            </View>
          </View>)}
        </Formik>
      </View>
      {password && <View style={styles.passwordContainer}>
        <Text style={{ textAlign: 'center' }}>
          Long Press to Copy
        </Text>
        <View style={styles.passwordView}>
          <Text style={styles.passwordText} selectable={true}>
            {password}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Copy to clipboard" color="darkcyan" onPress={copyToClipboard} />
        </View>
      </View>}
    </View>
  );
};

export default PasswordGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363736',
  },
  passwordView: {
    backgroundColor: 'gainsboro',
    width: '70%',
    paddingVertical: 10,
    borderRadius: 3,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  passwordText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  passwordContainer: {
    margin: 10,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
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
    textAlign: 'center',
  },
});

