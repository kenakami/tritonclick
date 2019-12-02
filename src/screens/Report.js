import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Dialog } from 'react-native-simple-dialogs';
import * as firebase from 'firebase';

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
            .ref('users/' + this.currentUser.uid + '/allow_notifications')
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

            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.inputContainer}>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Feedback"
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
                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText} onPress={() => {this.submitFeedback(this.state.feedback)}} >Submit</Text>
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

                        <Dropdown
                            label='Notifications'
                            data={type}
                            onChangeText={(allowNotification) => this.setState({ allowNotification })}
                            allowNotification ={this.state.allowNotification}
                        />

                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText} onPress={() => {

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

                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText} onPress={() => this.props.navigation.navigate('Page')} >Cancel</Text>
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
