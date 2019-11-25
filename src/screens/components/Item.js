import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

export default class Item extends React.Component {
    render() {
        return(
            <View>
                <TouchableOpacity onPress={this.props.toViewListing}>
                    <View style={styles.whole}>
                        <View style={styles.pic}>
                            <Text>
                                {this.props.picture}
                            </Text>
                        </View>
                        <View style={styles.desc}>
                            <Text>
                                {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.price}>
                            <Text>
                                ${this.props.price}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = EStyleSheet.create({
    pic: {
        width: 60,
        height: 20,
    },
    desc: {
        width: 150,
        height: 25,
    },
    price: {
        width: 30,
        height: 25,
    },
    whole: {
        paddingHorizontal: '1rem',
        justifyContent: 'centered',
        flexDirection: 'row'
    }
})