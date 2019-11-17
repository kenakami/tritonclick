import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Item extends React.Component {
    render() {
        return(
            <View>
                <TouchableOpacity onPress={this.props.toViewListing}>
                    <Text>
                        {this.props.picture}
                        {this.props.description}
                        {this.props.price}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}