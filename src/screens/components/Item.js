import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import * as firebase from "firebase";

let pic = "";

export default class Item extends React.Component {
    render() {
        return(
            <View style ={styles.container}>
                <TouchableOpacity onPress={this.props.toViewListing}>
                    <View style={styles.whole}>
                        <View style={styles.pic}>
                            <Image
                                source={{ uri: this.props.picture }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.desc}>
                            <Text style={styles.word}>
                                {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.textPrice}>
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
        width: '5rem',
        height: '5rem',
    },
    image: {
        width: "5rem",
        height:  "5rem",
        resizeMode: 'contain',
    },
    desc: {
        marginLeft: '1rem',
        marginTop: '2rem',
        width: '7rem',
        height: '1.5rem',
    },
    word: {
        fontSize: '0.75rem'
    },
    textPrice: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    price: {
        marginLeft: '0.75rem',
        marginTop: '0.5rem',
        width: '3rem',
        height: '2rem',
    },
    container: {
        paddingVertical: '0.05rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    whole: {
        paddingHorizontal: '0.5rem',
        paddingVertical: '0.25rem',
        flexDirection: 'row',
        width: '17.5rem',
        borderWidth: 1,

    }
})
