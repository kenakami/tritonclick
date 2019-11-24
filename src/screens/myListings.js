import React from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import Item from "./components/Item";
import EStyleSheet, {child} from "react-native-extended-stylesheet";
import * as firebase from 'firebase';

let dataArr = [];

export default class myListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: false
        }

        let database = firebase.database();
        const { currentUser } = firebase.auth();
        let fer = database.ref(`users/${currentUser.uid}/Selling/`);
        fer.on('value', getData, errData);

        function getData(data) {
            let clicker = data.val();
            let keys = Object.keys(clicker);
            for( var i = 0; i < keys.length; i++ ) {
                let k = keys[i];
                clicker[k] .clickerid = k;
                dataArr[i] = clicker[k];
            }
        }
        function errData(err) {
            console.log("error");
        }
    }

    componentDidMount() {
        setTimeout(() =>{
            this.setTimePassed();
        }, 1000)
    }

    setTimePassed() {
        this.setState({timePassed:true});
    }

    render() {
        if( !this.state.timePassed ) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>)
        } else {
            return(
                <ScrollView>
                    <View style={styles.container} nestedScrollEnabled={true}>
                        <FlatList
                            data={dataArr}
                            renderItem={({ item }) => (
                                <Item
                                    picture={item.Barcode}
                                    description={item.Condition + item.Type}
                                    price={item.Price}
                                    toViewListing={
                                        () => {this.props.navigation.navigate('ListingSeller', item)}
                                    }
                                />
                            )}
                        />
                    </View>
                    {/*
                    <View style={styles.container} nestedScrollEnabled={true}>
                        <FlatList
                            data={dataArr}
                            renderItem={({ item }) => (
                                <Item
                                    picture={item.picture}
                                    description={item.description}
                                    price={item.price}
                                    toViewListing={
                                        () => {this.props.navigation.navigate('ListingLoan')}
                                    }
                                />
                            )}
                        />
                    </View>
                    <View style={styles.container} nestedScrollEnabled={true}>
                        <FlatList
                            data={dataArr}
                            renderItem={({ item }) => (
                                <Item
                                    picture={item.picture}
                                    description={item.description}
                                    price={item.price}
                                    toViewListing={
                                        () => {this.props.navigation.navigate('ListingRent')}
                                    }
                                />
                            )}
                        />
                    </View> */}
                </ScrollView>
            )
        }
    }
}


const styles = EStyleSheet.create({
    container:{
        paddingTop: '2rem'
    },
    text: {
        fontSize: 16
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});