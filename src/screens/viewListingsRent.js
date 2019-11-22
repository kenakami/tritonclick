import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';


const viewListingsRent = (props) => {
      return (

        <View style={styles.container}>
  
          <ScrollView>

            {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
            <View style={styles.inputContainer}>
  
              <Text style={styles.textInput}>Loaner Email goes here</Text>
  
              <Text style={styles.textInput}>Price per timeframe goes here</Text>

              <Text style={styles.textInput}>Type of iClicker goes here</Text>
  
              <Text style={styles.textInput}>Condition of iClicker goes here</Text>
  
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
      );
    };
  
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

  export default viewListingsRent;