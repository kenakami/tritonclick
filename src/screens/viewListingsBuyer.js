import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

const viewListingsBuyer = (props) => {

      const { navigation } = this.props;

      return (

        <View style={styles.container}>
  
          <ScrollView>

            {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
            <View style={styles.inputContainer}>
  
              <Text style={styles.textInput}>Seller: {JSON.stringify(navigation.getParam('users/'+(navigation.userid)+'/Selling/'+(navigation.iclickerid)+'/Email'))}@ucsd.edu</Text>
  
              <Text style={styles.textInput}>Price: ${JSON.stringify(navigation.getParam('users/'+(navigation.userid)+'/Selling/'+(navigation.iclickerid)+'Price'))}</Text>

              <Text style={styles.textInput}>Type: {JSON.stringify(navigation.getParam('users/'+(navigation.userid)+'/Selling/'+(navigation.iclickerid)+'Type'))}</Text>
  
              <Text style={styles.textInput}>Condition: {JSON.stringify(navigation.getParam('users/'+(navigation.userid)+'/Selling/'+(navigation.iclickerid)+'Condition'))}</Text>
  
              {/* TODO Display Picture*/}
  
              <View style={styles.inputContainer}>
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

  export default viewListingsBuyer;