import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Dialog } from 'react-native-simple-dialogs';
import * as firebase from 'firebase';
import EStyleSheet from "react-native-extended-stylesheet";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            allowNotification: '',
            feedback: '',
        };
    }
    writeToggle(AllowNotification) {
        this.currentUser = firebase.auth().currentUser;
        firebase
            .database()
            .ref('users/' + this.currentUser.uid + '/allow_notifications/')
            .set(AllowNotification);
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };


    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    submitFeedback(text){
        alert("Thank you for submitting feedback")
        firebase.database().ref(`feedback`).push({
            feedback: text,

        }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    };


    render() {

        let type = [{
            value: 'on',
        }, {
            value: 'off',
        }];




        return (

            <View>
                <ScrollView>
                    <View style={styles.header}>
                            <Text style={{fontSize: 20}}>Settings</Text>
                    </View>
                    <View style={styles.inputContainer}>  
                        
                          <Dropdown 
                              label='Notifications'
                              data={type}
                              onChangeText={(allowNotification) => this.setState({ allowNotification })}
                              allowNotification ={this.state.allowNotification}       
                            allowNotification ={this.state.allowNotification}
                              allowNotification ={this.state.allowNotification}       
                          />

                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText} onPress={() => {

                                    if (this.state.allowNotification === '') {
                                        alert("No changes made");
                                    }
                                    else {
                                        alert("Your preferences have been saved");
                                        this.writeToggle(this.state.allowNotification);
                                    }



                                }} >Save</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.heading}>Feedback</Text>
                        <View style={styles.feedback}>
                            <TextInput
                                style={styles.textInput}
                                maxLength={100}
                                keyboardType="default"
                                autoCorrect={true}
                                value={this.state.feedback}
                                multiline={true}
                                maxHeight={200}
                                onChangeText={(feedback) => {
                                    this.setState({feedback})
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitButtonText} onPress={() => {this.submitFeedback(this.state.feedback)}} >Submit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText} onPress={() => this.setState({dialogVisible: true})} >View Terms and Conditions</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText} onPress={() => firebase.auth().signOut()} >Sign out</Text>
                            </TouchableOpacity>
                        </View>

                        <Dialog
                            visible={this.state.dialogVisible}
                            title="Terms and Conditions"
                            onTouchOutside={() => this.setState({dialogVisible: false})} >
                            <View>
                                <Text>
                                    Users of this app assume all risks associated with its use.
                                </Text>
                            </View>
                        </Dialog>




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
        paddingTop: 50,
        paddingBottom: 15,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4"
    },
    heading: {
        margin: 10,
        fontSize:20,
    },
    inputContainer: {
        paddingTop: 15,
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        height: 125,
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
        margin: 5,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    text: {
        fontSize: 12
    },
    submitButton: {
      borderWidth: 1,
      alignContent: "center",
      width: "30%",
      borderColor: '#007BFF',
      backgroundColor: '#007BFF',
      padding: 15,
      marginLeft: "35%",
      marginBottom: 20,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },
    feedback:{
        paddingLeft:10,
        paddingRight:10, 
        paddingTop:10,
    },

});
