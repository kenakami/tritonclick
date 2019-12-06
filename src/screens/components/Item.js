import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import * as firebase from "firebase";

export default class Item extends React.Component {
/*
    componentDidMount() {
        const db = firebase.firestore();
        let dRef = db.collection("users");
        const currUser = firebase.auth;
        dref.get(`${currUser.uid}`).then()
    }
*/
    render() {
        return(
            <View>
                <TouchableOpacity onPress={this.props.toViewListing}>
                    <View style={styles.whole}>
                        <View style={styles.pic}>
                            <Image
                                source={{ uri: this.props.picture }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'center',}}
                            />
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
        width: 50,
        height: 50,
        resizeMode: 'center',
    },
    desc: {
        width: 150,
        height: 25,
    },
    price: {
        width: 50,
        height: 25,
    },
    whole: {
        paddingHorizontal: '1rem',
        flexDirection: 'row'
    }
})
