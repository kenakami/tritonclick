import React, {Component} from 'react';
import {Button, Text, View, Image, ScrollView, TextInput, TouchableOpacity, ImageBackgroundBase} from 'react-native';
import EStyleSheet, {child} from "react-native-extended-stylesheet";
import * as firebase from 'firebase';

export default class viewListingsBuyer extends React.Component {

    render() {

        // Shortcut provided from Listing
        const {navigation} = this.props;
        const clickerid = navigation.getParam('clickerid', 'default');
        const sellerid = navigation.getParam('UserID', 'default');
        const image = navigation.getParam('Image', 'https://firebasestorage.googleapis.com/v0/b/tritonclick.appspot.com/o/Default.jpg.png?alt=media&token=5b8e5d3c-b55b-4ec1-be6d-21928bf4b9cc');

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: image}} style={styles.image}/>
                    </View>

                    {/* Inputs for Email, Barcode, Price, iClicker, Sell Option, Picture, */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Created by: {navigation.getParam('Name')}</Text>
                        <Text style={styles.price}>${navigation.getParam('Price')}</Text>
                        <Text style={styles.desc}>{navigation.getParam('Condition') + " " + navigation.getParam('Type')}</Text>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText}
                                      onPress={() => {
                                          this.props.navigation.navigate('chat', {
                                              listingId: clickerid,
                                              sellerId: sellerid,

                                          });


                                      }}>Message</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = EStyleSheet.create({
    image: {
        flex: 1,
        width: '14rem',
        height: '14rem',
        resizeMode: 'contain',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        height: '15rem',
        width: '15rem',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingTop: '3rem'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    saveButton: {
        borderWidth: 2,
        borderColor: '#007BFF',
        backgroundColor: 'rgb(184,221,252)',
        padding: 15,
        margin: 5,
        borderRadius: 10,
    },
    saveButtonText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center'
    },
    price: {
        position: 'absolute',
        top: '1.5rem',
        left: '16rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    desc: {
        position: 'absolute',
        top: '1.5rem',
        left: '0.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '1rem',
        paddingTop: '1rem',
        paddingLeft: '0.5rem',
        paddingBottom: '0.5rem',
    }
});
