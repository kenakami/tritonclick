import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';


const viewListingsBuyer = (props) => {

      return (

        <View style={styles.container}>
  
          <ScrollView>

            {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
            <View style={styles.inputContainer}>
  
              <Text>Seller Email goes here</Text>
  
              <Text>Price goes here</Text>

              <Text>Type of iClicker goes here</Text>
  
              <Text>Condition of iClicker goes here</Text>
  
              {/* TODO Display Picture*/}
  
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText} onPress={() => alert("You have responded to Seller")} >Email</Text>
                </TouchableOpacity>

              </View>
  
            </View>
          </ScrollView>
  
        </View>
      )
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
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

  export default ListingsBuyer;