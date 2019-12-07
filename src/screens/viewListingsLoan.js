import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import EStyleSheet from "react-native-extended-stylesheet";


export default class viewListingsLoan extends React.Component {

  constructor(props) {
    super(props);

    // Set state to the item information using params
    this.state = {
      barcode: props.navigation.getParam('Barcode', 'default'),
      condition: props.navigation.getParam('Condition', 'default'),
      email: props.navigation.getParam('Email', 'default'),
      price: props.navigation.getParam('Price', 'default'),
      type: props.navigation.getParam('Type', 'default'),
    };
  }

  updateListing(barcode, condition, email, price, type, clickerid) {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/Loan/${clickerid}`).set({
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

  deleteListing(clickerid) {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/Loan/${clickerid}`).remove();
  }

  render() {
    // Get listing information through param
    const { navigation } = this.props;
    const clickerid = navigation.getParam('clickerid', 'default');
    const image = navigation.getParam('Image', 'default');

    function Separator() {
      return <View style={styles.separator} />;
    }

    const dd_type = [{value: 'iClicker 1',}, {value: 'iClicker 2',}];
    const dd_cond = [{value: 'Like New',}, {value: 'Used',}];

    return (

      <View style={styles.container}>

        <ScrollView>
          <View style={styles.imageContainer}>
            <Image source={{uri: image}} style={styles.image}/>
          </View>

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

            <Text style={styles.text}>Barcode:</Text>
            <TextInput
              style={styles.textInput}
              maxLength={8}
              autoCorrect={false}
              onChangeText={(barcode) => this.setState({ barcode })}
              value={this.state.barcode}
            />

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
              data={dd_type}
              onChangeText={(type) => this.setState({ type })}
              value={this.state.type}
            />

            <Dropdown
              label='Condition of iClicker'
              data={dd_cond}
              onChangeText={(condition) => this.setState({ condition })}
              value={this.state.condition}
            />

            {/* TODO Create Picture Input*/}

            {/*Buttons go on the bottom */}
            {/* To implement functionality */}
           
            <View style={styles.inputContainer}>

              <TouchableOpacity style={styles.blueButton} backgroundColor='blue' borderColor='blue'
                onPress={() => {
                  Alert.alert(
                    'Save',
                    'Save your changes?',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'cancel'},
                      {text: 'OK', onPress: () =>{
                        this.updateListing(this.state.barcode, this.state.condition,
                                           this.state.email, this.state.price,
                                           this.state.type, clickerid),
                        this.props.navigation.navigate('Page') }
                      }
                    ]
                  );
                }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.greenButton} backgroundColor='green' borderColor='green'
                onPress= {() => {
                  Alert.alert(
                    'Start',
                    'Start rent?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'OK', onPress: () =>{
                        this.props.navigation.navigate('Page') }
                      }
                    ]
                  );
                }}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.redButton} backgroundColor='red' borderColor='red'
                onPress= {() => {
                  this.deleteListing(clickerid );
                  Alert.alert(
                    'End',
                    'End Rent?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'OK', onPress: () =>{
                        this.deleteListing(clickerid), 
                        this.props.navigation.navigate('Page') }
                      }
                    ]
                  );
                }}>
                <Text style={styles.buttonText}>End</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.redButton} backgroundColor='red' borderColor='red'
                onPress= {() => {
                  this.deleteListing(clickerid );
                  Alert.alert(
                    'Delete',
                    'Delete listing?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'OK', onPress: () =>{
                        this.deleteListing(clickerid), 
                        this.props.navigation.navigate('Page') }
                      }
                    ]
                  );
                }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              {/* TODO
                More functionality needed:
                  - Rental start/end - keep track?
                  - Pictures
              */}
              
            </View>

          </View>
        </ScrollView>

      </View>
    );
  }
  
}
  
const styles = EStyleSheet.create({
  image: {
    flex: 1,
    width: '20rem',
    height: '16rem',
    resizeMode: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  buttonContainer: {
    paddingTop: 10,
  },
  blueButton: {
    borderWidth: 1,
    backgroundColor: 'blue',
    borderColor: 'blue',
    padding: 15,
    margin: 5
  },
  greenButton: {
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
    padding: 15,
    margin: 5
  },
  redButton: {
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
