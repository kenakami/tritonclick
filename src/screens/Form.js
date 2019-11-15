import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import db from '../base'


export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      barcode: '',
      price: '',
      type: '',
      condition: ''
    };
  }
  writeUserData(Email, Barcode, Price, Type, Condition) {
    
    //This would be to get the current user
    //const{ currentUser } = db.auth();
    //db.database().ref(`Users/${currentUser.uid}/Selling/`)
    
    
    db.database().ref('Users/UserID/Selling/').push({
      Email,
      Barcode,
      Price,
      Type,
      Condition
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }


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

            {/*<Dropdown
              label='Selling or Renting Out?'
              data={trans}
            />*/}

          
            {/*<Button
              title="Save"
              onPress={() => this.writeUserData(this.state.email,this.state.barcode,this.state.price,this.state.type,this.state.condition)}
            /> */}

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.saveButton} onPress={() => this.writeUserData(this.state.email,this.state.barcode,this.state.price,this.state.type,this.state.condition)}
              >
                <Text style={styles.saveButtonText}>Save</Text>
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