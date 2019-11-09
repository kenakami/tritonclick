import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const BuyRent = () =>{
    return(
        <View style= {{padding : 50}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="SORT" />
                <Button title="FILTER" />
            </View>
        </View>
    );
}

export default BuyRent;