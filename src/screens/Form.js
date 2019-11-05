import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class SettingsScreen extends React.Component {
  render() {

    let type = [{
      value: 'iClicker 1',
    }, {
      value: 'iClicker 2',
    }];

    let cond = [{
      value: 'Like New',
    }, {
      value: 'Used',
    }];

    let trans = [{
      value: 'Selling',
    }, {
      value: 'Renting Out',
    }];

    return (

      <View style={styles.container}>

        <ScrollView>
          <View style={styles.inputContainer}>

            <TextInput
              style={styles.textInput}
              placeholder="Your Email"
              maxLength={20}
              keyboardType="email-address"
              autoCorrect={false}
            />

            <View>
              <Text style={styles.text}>Barcode:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Barcode"
                maxLength={8}
                autoCorrect={false}
              />
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Price"
              keyboardType="numeric"
            />
            <Dropdown
              label='Type of iClicker'
              data={type}
            />

            <Dropdown
              label='Condition of iClicker'
              data={cond}
            />

            <Dropdown
              label='Selling or Renting Out?'
              data={trans}
            />


            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText} onPress={() => alert("Thank you for submitting")} >Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 12
  }

});