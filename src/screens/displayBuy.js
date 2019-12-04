import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, TextInput} from 'react-native';
import * as firebase from 'firebase';
import { Card, ListItem } from 'react-native-elements';
import { Dropdown } from "react-native-material-dropdown";
import Item from "./components/Item";
import EStyleSheet from "react-native-extended-stylesheet";

/* Array of iCLickers */
var dataArr = []

export default class displayBuy extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            type: 'All',
            condition: 'All',
            sort: 'Price',
            timePassed: false
        };
        /* Call to database */
        let database = firebase.database();
        let fer = database.ref('users/');
        let storageRef;
        let  currentUser = firebase.auth();

        fer.once('value', getUsers, errData)

        function getUsers(data) {
            let users = data.val();
            let keys = Object.keys(users);
            for (var i = 0; i < keys.length; i++) {
                let k = keys[i]
                if (users[k].Selling !== null) {
                    let userID = users[k].user_id;
                    let ref = database.ref(`users/${userID}/Selling/`);
                    ref.once('value', gotData, errData);
                }
            }
            return dataArr;
        }

        //let self = this.state;

        function gotData(data) {
            let clicker = data.val();
            if( clicker==null ) {
                return;
            }
            keys = Object.keys(clicker);
            for (var i = 0; i < keys.length; i++) {
                let k = keys[i];
                clicker[k].clickerId = k;
                //dataArr[i] = clicker[k];
                dataArr.push(clicker[k]);
                storageRef = firebase.storage().ref(`users/${currentUser.uid}/${clicker[k].Barcode}`);
                storageRef.getDownloadURL().then( function(please) {
                        clicker[k].url = please;
                        console.log((please));
                    }, function(error) {
                        clicker[k].url = 'https://facebook.github.io/react-native/img/tiny_logo.png';
                        console.log(error);
                    }
                )
            }
        }

        function errData(err) {
            console.log("error");
        }

    }

    componentDidMount() {
        setTimeout(() => {
            this.setTimePassed();
        }, 1500);
    }

    componentWillUnmount() {
        dataArr = [];
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    render() {

        var currData = []
        for (var i = 0; i < dataArr.length; i++){
            if ((this.state.condition === 'All' || this.state.condition === dataArr[i].Condition) &&
                (this.state.type === 'All' || this.state.type === dataArr[i].Type)) {
                currData.push(dataArr[i]);
            }
        }
        if (this.state.sort === 'Price') {
            currData.sort((a, b) => {return a.Price - b.Price});
        } else if(this.state.sort === 'Condition') {
            currData.sort((a, b) => {
                var x = a.Condition.toLowerCase();
                var y = b.Condition.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
        } else if(this.state.sort  == 'Type') {
            currData.sort((a, b) => {
                var x = a.Type.toLowerCase();
                var y = b.Type.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });

        }

        /* Options for each dropdown menu */
        let type = [{ value: 'iClicker 1', }, { value: 'iClicker 2', }];
        let cond = [{ value: 'Like New', }, { value: 'Used', }];
        let sortConditions = [{ value: 'Price', }, { value: 'Posted Date', }, { value: 'Condition', }, { value: 'Type', }];


        if (!this.state.timePassed) {
            return <View style={styles.loadScreen}>
                <ActivityIndicator size="large" style={styles.wheel} />
            </View>;
        }

        else {
            return (
                /* Type, Condition, and Sort dropdown menusa */
                <View>
                    <View style={styles.header}>
                        <Text style={{fontSize: 20}}>Buy</Text>
                    </View>
                        <View style={styles.dropdown}>
                            <Dropdown
                                containerStyle={{width: 120, top: 30}}
                                autosize={false}
                                label='Type'
                                data={type}
                                onChangeText={(value) => this.changeType(value)}
                                value = {this.state.type}
                            />
                            <Dropdown
                                containerStyle={{width: 120, top: 30}}
                                autosize={false}
                                label='Condition'
                                data={cond}
                                onChangeText={(value) => this.changeCond(value)}
                                value = {this.state.condition}
                            />
                            <Dropdown
                                containerStyle={{width: 120, top: 30}}
                                autosize={false}
                                label='Sort By'
                                data={sortConditions}
                                onChangeText={(value) => this.changeSort(value)}
                                dropdownPosition={-5}
                            />
                        </View>
                    <ScrollView>
                        <FlatList
                            data={currData}
                            renderItem={({ item }) => (
                                <Item
                                    picture={item.url}
                                    description={item.Condition + " " + item.Type}
                                    price={item.Price}
                                    toViewListing={
                                        () => {this.props.navigation.navigate('ListingBuyer', item)}
                                    }
                                />
                            )}
                            keyExtractor={item => item.clickerid}
                        >

                        </FlatList>
                    </ScrollView>
                </View>
            )
        }

    }

    changeType = (value) => {
        this.setState({type: value});
        this.forceUpdate()
    }

    changeCond = (value) => {
        this.setState({condition: value});
        this.forceUpdate()
    }

    changeSort = (value) => {
        this.setState({sort: value})
        this.forceUpdate()
    }
}

const styles = EStyleSheet.create({
    loadScreen: {
        alignSelf: "center"
    },
    wheel: {
        marginTop: "50%"
    },
    header: {
        paddingTop: 50,
        paddingBottom: 15,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4"
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
})