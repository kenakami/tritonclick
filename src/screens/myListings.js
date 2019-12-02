import React from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import Item from "./components/Item";
import EStyleSheet, {child} from "react-native-extended-stylesheet";
import * as firebase from 'firebase';

let sellArr = [];
let loanArr = [];

export default class myListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: false
        }

        sellArr = [];
        loanArr = [];

        let database = firebase.database();
        const { currentUser } = firebase.auth();
        let sellRef = database.ref(`users/${currentUser.uid}/Selling/`);
        let  storageRef;
        let loanRef = database.ref(`users/${currentUser.uid}/Loan/`);
        sellRef.on('value', getSellData, errData);
        loanRef.on('value', getLoanData, errData);

        function getSellData(data) {
            let clicker = data.val();
            if( clicker == null){
                return;
            }
            let keys = Object.keys(clicker);
            for( let i = 0; i < keys.length; i++ ) {
                let k = keys[i];
                clicker[k].clickerid = k;
                sellArr.push(clicker[k]);
                storageRef = firebase.storage().ref(`/users/${currentUser.uid}/${clicker[k].Barcode}`);
                storageRef.getDownloadURL().then( function(please) {
                        clicker[k].url = please;
                        console.log((please));
                    }, function(error) {
                        clicker[k].url = 'https://facebook.github.io/react-native/img/tiny_logo.png';
                        console.log(error);
                    }
                )

                //sellArr[i] = clicker[k];
            }
        }
        function getLoanData(data) {
            let clicker = data.val();
            if( clicker == null){
                return;
            }
            let keys = Object.keys(clicker);
            for( let i = 0; i < keys.length; i++ ) {
                let k = keys[i];
                clicker[k] .clickerid = k;
                loanArr.push(clicker[k]);
                storageRef = firebase.storage().ref(`/users/${currentUser.uid}/${clicker[k].Barcode}`);
                storageRef.getDownloadURL().then( function(please) {
                        clicker[k].url = please;
                        console.log((please));
                    }, function(error) {
                        clicker[k].url = 'https://facebook.github.io/react-native/img/tiny_logo.png';
                        console.log(error);
                    }
                )
                //loanArr[i] = clicker[k];
            }
        }

        function errData(err) {
            console.log("error");
        }
    }

    componentDidMount() {

        setTimeout(() =>{
            this.setTimePassed();
        }, 3000)
    }

    setTimePassed() {
        this.setState({timePassed:true});
    }

    render() {
        if( !this.state.timePassed ) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>)
        } else {
            return(
                <View nestedScrollEnabled={true}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Selling iClickers</Text>
                        <FlatList
                            data={sellArr}
                            renderItem={({ item }) => (
                                    <Item
                                        picture={item.url}
                                        description={item.Condition + " " + item.Type}
                                        price={item.Price}
                                        toViewListing={
                                            () => {this.props.navigation.navigate('ListingSeller', item)}
                                        }
                                    />
                            )}
                            keyExtractor={(item) => item.clickerid}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.text}>Loaning iClickers</Text>
                        <FlatList
                            data={loanArr}
                            renderItem={({ item }) => (
                                <Item
                                    picture={item.url}
                                    description={item.Condition + " " + item.Type}
                                    price={item.Price}
                                    toViewListing={
                                        () => {this.props.navigation.navigate('ListingLoan', item)}
                                    }
                                />
                            )}
                            keyExtractor={(item) => item.clickerid}
                        />
                    </View>
                </View>
            )
        }
    }
}


const styles = EStyleSheet.create({
    container:{
        paddingTop: '1rem',
        width: '20rem',
        height: '15rem',
    },
    text: {
        fontSize: 20,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});