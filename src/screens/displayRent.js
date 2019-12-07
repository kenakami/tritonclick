import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Button} from 'react-native';
import * as firebase from 'firebase';
import { Card, ListItem } from 'react-native-elements';
import { Dropdown } from "react-native-material-dropdown";
import Item from "./components/Item";
import EStyleSheet from "react-native-extended-stylesheet";

var dataArr = []

export default class displayRent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            type: 'All',
            condition: 'All',
            sort: 'Price',
            timePassed: false
        };


        let database = firebase.database();
        let fer = database.ref('users/');

        fer.on('value', getUsers, errData);

        function getUsers(data) {
            let users = data.val();
            let keys = Object.keys(users);
            for (var i = 0; i < keys.length; i++) {
                let k = keys[i]
                if (users[k].Loan != null) {
                    let userID = users[k].user_id;
                    let ref = database.ref(`users/${userID}/Loan/`);
                    ref.on('value', gotData, errData);
                }
            }
            return dataArr;
        }
        function gotData(data) {
            let clicker = data.val();
            if (clicker == null) {
                return;
            }
            let keys = Object.keys(clicker);
            for (var i = 0; i < keys.length; i++) {
                let k = keys[i];
                clicker[k].clickerid = k;
                dataArr.push(clicker[k]);
            }

        }
        function errData(err) {
            console.log(err);
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

        let type = [{ value: 'All' }, { value: 'iClicker 1', }, { value: 'iClicker 2', }];
        let cond = [{ value: 'All' }, { value: 'Like New', }, { value: 'Used', }];
        let sortConditions = [{ value: 'Price', }, { value: 'Posted Date', }, { value: 'Condition', }, { value: 'Type', }];


        if (!this.state.timePassed) {
            return <View style={styles.loadScreen}>
                <ActivityIndicator size="large" style={styles.wheel}/>
            </View>;
        }

        else {
            return (
                <View>
                    <View style={styles.header}>
                        <Text style={{fontSize: 20}}>Rent</Text>
                    </View>
                        <View style={styles.dropdown}>
                            <Dropdown
                                containerStyle={{width: 120, top: 10}}
                                autosize={false}
                                label='Type'
                                data={type}
                                onChangeText={(value) => this.changeType(value)}
                                value = {this.state.type}
                            />
                            <Dropdown
                                containerStyle={{width: 120, top: 10}}
                                autosize={false}
                                label='Condition'
                                data={cond}
                                onChangeText={(value) => this.changeCond(value)}
                                value = {this.state.condition}
                            />
                            <Dropdown
                                containerStyle={{width: 120, top: 10}}
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
                                    picture={item.Image}
                                    description={item.Condition + " " + item.Type}
                                    price={item.Price}
                                    toViewListing={
                                        () => {this.props.navigation.navigate('ListingRent', item)}
                                    }
                                />
                            )}
                            keyExtractor={(item) => item.clickerid}
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

const styles = StyleSheet.create({
    loadScreen:{
        alignSelf: "center"
    },
    wheel:{
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
