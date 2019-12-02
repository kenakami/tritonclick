import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as firebase from 'firebase';


export default class Settings extends React.Component {
  render() {

    let type = [{
      value: 'On',
    }, {
      value: 'Off',
    }];




    return (

      <View style={styles.container}>

        <ScrollView>
          <View style={styles.inputContainer}>

            <TextInput
              style={styles.textInput}
              placeholder="Feedback"
              maxLength={100}
              keyboardType="default"
              autoCorrect={true}
            />
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText} onPress={() => alert("Thank you for your feedback")} >Submit</Text>
              </TouchableOpacity>
            </View>

			<View style={styles.inputContainer}>
			  <TouchableOpacity
				style={styles.saveButton}
			  >
				<Text style={styles.saveButtonText} onPress={() => alert("Redirecting")} >View Terms and Conditions</Text>
			  </TouchableOpacity>
			</View>

            <Dropdown
              label='Notifications'
              data={type}
            />




            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText} onPress={() => alert("Your preferences have been saved")} >Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
              <Button title="Sign out" onPress={() => firebase.auth().signOut()} />

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
