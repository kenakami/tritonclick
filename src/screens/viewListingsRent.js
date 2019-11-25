import React, { Component } from 'react';
import { Button, Text, View, Image, ScrollView, TextInput, TouchableOpacity, ImageBackgroundBase } from 'react-native';
import EStyleSheet, {child} from "react-native-extended-stylesheet";
import * as firebase from 'firebase';

export default class viewListingsBuyer extends React.Component {

  render() {

    // Shortcut provided from Listing
    const { navigation } = this.props;

      return (

        <View style={styles.container}>
  
          <ScrollView>

            {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
            <View style={styles.inputContainer}>
  
            <Text style={styles.textInput}>Email: {JSON.stringify(navigation.getParam('Email', 'no email'))}</Text>
  
            <Text style={styles.textInput}>Price: {JSON.stringify(navigation.getParam('Price', 'no price'))}</Text>

            <Text style={styles.textInput}>Type of iClicker: {JSON.stringify(navigation.getParam('Type', 'no type'))}</Text>

            <Text style={styles.textInput}>Condition: {JSON.stringify(navigation.getParam('Condition', 'no condition'))}</Text>

            {/* TODO Display Picture*/}

              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText} onPress={() => alert("You have responded to the Loaner")} >Email</Text>
                </TouchableOpacity>

              </View>
  
            </View>
          </ScrollView>
  
        </View>
      )
    }
  }
  
  const styles = EStyleSheet.create({
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
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