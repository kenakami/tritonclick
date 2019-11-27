import * as React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, TextInput} from 'react-native';
import * as firebase from 'firebase';
import { Card, ListItem } from 'react-native-elements';
import {Dropdown} from "react-native-material-dropdown";

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


        let database = firebase.database();
        let fer = database.ref('users/');
        fer.on('value', getUsers, errData)
        function getUsers(data) {
            let users = data.val();
            let keys = Object.keys(users);
            for (var i = 0; i < keys.length; i++) {
                let k = keys[i]
                if (users[k].Selling !== null) {
                    let userID = users[k].user_id;
                    let ref = database.ref(`users/${userID}/Selling/`);
                    ref.on('value', gotData, errData);
                }
            }
            return dataArr;
        }



        let self = this.state;

        function gotData(data) {
            let clicker = data.val();
            let keys;
            try {
                keys = Object.keys(clicker);
            }catch(Exception){}
            try{
                for (var i = 0; i < keys.length; i++) {
                    let k = keys[i];
                    clicker[k].clickerId = k;
                    //dataArr.push(clicker[k]);

                    if ((self.condition === 'All' || self.condition === clicker[k].Condition) &&
                            (self.type === 'All' || self.type === clicker[k].Type)){
                        alert(self.condition);
                        dataArr[i] = clicker[k];
                    }


                    //dataArr[i] = clicker[k];

                }
            }catch(Exception){}

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

        let type = [{
            value: 'iClicker 1',
        }, {
            value: 'iClicker 2',
        }];

        let cond = [{
            value: 'Like New',
        }, {
            value: 'Used',
        }];

        let S = [{
            value: 'Price',
        }, {
            value: 'Posted Date',
        }];


        if (!this.state.timePassed) {
            return <View style={styles.loadScreen}>
                <ActivityIndicator size="large" style={styles.wheel}/>
            </View>;
        }

        else {
            return (
                <ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Dropdown
                            autosize={false}
                            label='Type'
                            data={type}
                            onChangeText={(type) => this.setState({ type })}
                        />
                        <Dropdown
                            autosize={false}
                            label='Condition'
                            data={cond}
                            onChangeText={(condition) => this.setState({condition})}
                        />
                        <Dropdown
                            autosize={false}
                            label='Sort By'
                            data={S}
                            onChangeText={(sort) => this.setState({ sort })}
                        />
                    </View>
                    <FlatList
                        data={dataArr}
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
}
const styles = StyleSheet.create({
    loadScreen:{
        alignSelf: "center"
    },
    wheel:{
        marginTop: "50%"
    }
})