import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';


export default class viewListingsSeller extends React.Component {
  user_id = '7MOMLk3zgWSTUU9DfaPtd1oKKuF2'
  iclicker_id = '-LtvNooYML1cLJBdpJc8'

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      barcode: '',
      price: '',
      type: '',
      condition: '',
    };
  }

  updateListing(email, barcode, price, type, condition) {
    firebase.database().ref(`users/${this.user_id}/Selling/${this.iclicker_id}`).set({
      Barcode: barcode,
      Condition: condition,
      Email: email,
      Price: price,
      Type: type
    }).then((data) => {
      //success callback
      //console.log('data ', data)
      console.log('Changes saved!');
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  deleteListing() {
    firebase.database().ref(`users/${this.user_id}/Selling/${this.iclicker_id}`).remove();
  }

  render() {
    function Separator() {
      return <View style={styles.separator} />;
    }

    const type = [{value: 'iClicker 1',}, {value: 'iClicker 2',}];
    const cond = [{value: 'Like New',}, {value: 'Used',}];
    const trans = [{value: 'Selling',}, {value: 'Renting Out',}];

    const saveAlert = () => {
      alert(
        'Save Changes',
        'Are ya sure kid?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
          {text: 'Save', onPress: () => {
            this.updateListing(this.state.email, this.state.barcode, this.state.price, this.state.type, this.state.condition);
            console.log('Changes saved!!');}
          } ,

      
        ],
      );
    };

    const deleteAlert = () => {
      alert(
        'Deletion',
        'Are ya sure kid?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
          {text: 'Delete', onPress: () => {this.deleteListing(); console.log('Listing deleted!');} } ,
      
        ],
      );
    };
    
    const soldAlert = () => {
      alert(
        'Confirm Sale',
        'Do you want to confirm sale?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel'},
          {text: 'Confirm', onPress: () => {this.deleteListing(); console.log('Sale confirmed!');} },
        ],
      );
    };

    return (

      <View style={styles.container}>

        <ScrollView>

          {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
          <View style={styles.inputContainer}>

            <Text style={styles.text}>Email:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your Email"
              maxLength={20}
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />

            <View>
              <Text style={styles.text}>Barcode:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Barcode"
                maxLength={8}
                autoCorrect={false}
                onChangeText={(barcode) => this.setState({ barcode })}
                value={this.state.barcode}
              />
            </View>

            <Text style={styles.text}>Price:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={(price) => this.setState({ price })}
              value={this.state.price}
            />
            <Dropdown
              label='Type of iClicker'
              data={type}
              onChangeText={(type) => this.setState({ type })}
              value={this.state.type}
            />

            <Dropdown
              label='Condition of iClicker'
              data={cond}
              onChangeText={(condition) => this.setState({ condition })}
              value={this.state.condition}
            />

            {/* TODO Create Picture Input*/}

            {/*Buttons go on the bottom */}
            {/* To implement functionality */}
           
            <View style={styles.inputContainer}>

              <TouchableOpacity style={styles.saveButton} backgroundColor='blue' borderColor='blue'
                onPress={() => {
                  this.updateListing(this.state.email, this.state.barcode, this.state.price, this.state.type, this.state.condition);
                  alert("Changes saved!");
                }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.soldButton} backgroundColor='green' borderColor='green'
                onPress= {() => {
                  this.deleteListing();
                  alert("Confirmed as sold!");
                }}>
                <Text style={styles.buttonText}>Sold</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.deleteButton} backgroundColor='red' borderColor='red'
                onPress= {() => {
                  this.deleteListing();
                  alert("Listing deleted!");
                }}>
                <Text style={styles.buttonText}>Delete</Text>
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
    paddingTop: 15,
  },
  textInput: {
  },
  buttonContainer: {
    paddingTop: 10,
  },
  saveButton: {
    borderWidth: 1,
    backgroundColor: 'blue',
    borderColor: 'blue',
    padding: 15,
    margin: 5
  },
  soldButton: {
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
    padding: 15,
    margin: 5
  },
  deleteButton: {
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'red',
    padding: 15,
    margin: 5
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center'
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
  text: {
    fontSize: 12
  },
  separator: {
    marginVertical: 10,
  }
});
