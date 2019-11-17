import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


const viewListingsLoan = (props) => {

  navigationOptions = {
      title: 'viewListingsLoan',
  };

  function Separator() {
    return <View style={styles.separator} />;
  }

  const type = [{value: 'iClicker 1',}, {value: 'iClicker 2',}];
  const cond = [{value: 'Like New',}, {value: 'Used',}];
  const trans = [{value: 'Selling',}, {value: 'Renting Out',}];

  return (

    <View style={styles.container}>

      <ScrollView>
        
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
            placeholder="Number of quarters"
            keyboardType="numeric"
          />

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
          <Separator />

          <View style={styles.buttonContainer}>
            <Button title="Save" style={styles.button} onPress={() => alert("Changes saved")} />
            <Separator />
            <Button title="Start" style={styles.button} color='green' onPress={() => alert("Transaction started")}/>
            <Separator />
            <Button title="End" style={styles.button} color='red' onPress={() => alert("Transaction ended")}/>
            <Separator />
            <Button title="Delete" style={styles.button} color='red' onPress={() => alert("Listing deleted")} />
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
    padding: 10,
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
  },
  button: {
    paddingTop: 10,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
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
  },
  separator: {
    marginVertical: 10,
  }

});

export default viewListingsLoan;