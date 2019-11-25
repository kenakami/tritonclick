import * as React from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, Button} from 'react-native';
import * as firebase from 'firebase';
import { Card, ListItem } from 'react-native-elements';

var dataArr = []

export default class displayRent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
           
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
        if (!this.state.timePassed) {
            return <View style={styles.loadScreen}>
                <ActivityIndicator size="large" style={styles.wheel}/>
            </View>;
        }

        else {
            return (
                <ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button title="SORT"/>
                        <Button title="FILTER"/>
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