import * as React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Button} from 'react-native';
import * as firebase from 'firebase';
import { Card, ListItem } from 'react-native-elements';
import { Dropdown } from "react-native-material-dropdown";

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
        fer.on('value', getUsers, errData)
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
            let keys = Object.keys(clicker);
            for (var i = 0; i < keys.length; i++) {
                let k = keys[i];
                clicker[k].clickerId = k;
                dataArr[i] = clicker[k];
                console.log(dataArr[i]);
            }

        }
        function errData(err) {
            console.log("error");
        }

    }

    componentDidMount() {
        setTimeout(() => {
            this.setTimePassed();
        }, 1000);
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
            currData.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
        }

        let type = [{ value: 'iClicker 1', }, { value: 'iClicker 2', }];
        let cond = [{ value: 'New', }, { value: 'Like New', }, { value: 'Used', }];
        let sortConditions = [{ value: 'Price', }, { value: 'Posted Date', }];


        if (!this.state.timePassed) {
            return <View style={styles.loadScreen}>
                <ActivityIndicator size="large" style={styles.wheel}/>
            </View>;
        }

        else {
            return (
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Dropdown
                            containerStyle={{width: 140, top: 30}}
                            autosize={false}
                            label='Type'
                            data={type}
                            onChangeText={(value) => this.changeType(value)}
                            value = {this.state.type}
                        />
                        <Dropdown
                            containerStyle={{width: 140, top: 30}}
                            autosize={false}
                            label='Condition'
                            data={cond}
                            onChangeText={(value) => this.changeCond(value)}
                            value = {this.state.condition}
                        />
                        <Dropdown
                            containerStyle={{width: 140, top: 30}}
                            autosize={false}
                            label='Sort By'
                            data={sortConditions}
                            onChangeText={(value) => this.changeSort(value)}
                        />
                    </View>
                    <FlatList
                        data={currData}
                        renderItem={({ item }) => (
                            <View>
                                <Card title={item.Barcode}>
                                    <Text>{item.Condition + " " + item.Type}</Text>
                                    <Text>{item.Price}</Text>
                                </Card>
                            </View>
                        )}
                    >

                    </FlatList>
                </ScrollView>
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
    }
})