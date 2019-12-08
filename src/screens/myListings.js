import React from 'react';
import {Text, View, FlatList, ScrollView, ActivityIndicator} from 'react-native';
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
        let loanRef = database.ref(`users/${currentUser.uid}/Loan/`);
        sellRef.once('value', getSellData, errData);
        loanRef.once('value', getLoanData, errData);

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
        }, 2000)
    }

    setTimePassed() {
        this.setState({timePassed:true});
    }

    render() {
        if (!this.state.timePassed) {
            return <View style={styles.loadScreen}>
                <ActivityIndicator size="large" style={styles.wheel} />
            </View>;
        } else {
            return(
                <View nestedScrollEnabled={true}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Selling iClickers</Text>
                        <FlatList
                            data={sellArr}
                            renderItem={({ item }) => (
                                    <Item
                                        picture={item.Image}
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
                                    picture={item.Image}
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
        width: '20rem',
        height: '16.2rem',
    },
    text: {
        fontSize: '1rem',
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    loadScreen: {
        alignSelf: "center"
    },
    wheel: {
        marginTop: "50%"
    },
});