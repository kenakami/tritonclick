import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


const viewListingsSeller = (props) => {
  navigationOptions = {
    title: 'viewListingsSell',
  };

  const type = [{value: 'iClicker 1',}, {value: 'iClicker 2',}];
  const cond = [{value: 'Like New',}, {value: 'Used',}];
  const trans = [{value: 'Selling',}, {value: 'Renting Out',}];
  
  return (

    <View style={styles.container}>

      <ScrollView>
        
        {/*Save and Delete buttons on the top*/}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText} onPress={() => alert("Changes saved")} >Save</Text>
              {/* TODO implement functionality */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Delete</Text>
              {/* TODO implement functionality */}
            </TouchableOpacity>
        </View>

        {/* Test */}
        <View style={styles.buttonContainer}>
            <Button title="Save" />
            <Button title="Delete" />
        </View>

        {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
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

          {/* TODO Create Picture Input*/}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText} onPress={() => alert("You have responded to Buyer")} >Email</Text>
              {/* Navigate Back */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Sold</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

    </View>
  );
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

export default viewListingsSeller;