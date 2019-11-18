import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import Item from "./components/Item";
import EStyleSheet from "react-native-extended-stylesheet";

const DATA = [
    {
        id: '1',
        picture: 'Something',
        description: 'New iClicker 2',
        price: '$20',
    },
    {
        id: '2',
        picture: 'Do you know',
        description: 'Used iClicker 2',
        price: '$15',
    },
    {
        id: '3',
        picture: 'Wowee Dog',
        description: 'Used iClicker 1',
        price: '$10',
    },
    {
        id: '4',
        picture: 'Test',
        description: 'New iClicker 1',
        price: '$15',
    },
    {
        id: '5',
        picture: 'another one',
        description: 'New iClicker 1',
        price: '$15',
    },
    {
        id: '6',
        picture: 'one one',
        description: 'New iClicker 1',
        price: '$15',
    },
];

export default class myListings extends React.Component {
    toViewBuyer = () => {
        this.props.navigation.navigate('ListingBuyer');
    };

    toViewSeller = () => {
        this.props.navigation.navigate('ListingSeller');
    };

    toViewRenter = () => {
        this.props.navigation.navigate('ListingRenter');
    };

    toViewRentee = () => {
        this.props.navigation.navigate('ListingRentee');
    };

    render() {
        return(
            <ScrollView>
                <ScrollView style={styles.container} nestedScrollEnabled={false}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <Item
                                picture={item.picture}
                                description={item.description}
                                price={item.price}
                                toViewListing={this.toViewBuyer}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
                <ScrollView style={styles.container} nestedScrollEnabled={true}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <Item
                                picture={item.picture}
                                description={item.description}
                                price={item.price}
                                toViewListing={this.toViewSeller}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
                <ScrollView style={styles.container} nestedScrollEnabled={true}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <Item
                                picture={item.picture}
                                description={item.description}
                                price={item.price}
                                toViewListing={this.toViewRentee}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
                <ScrollView style={styles.container} nestedScrollEnabled={true}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <Item
                                picture={item.picture}
                                description={item.description}
                                price={item.price}
                                toViewListing={this.toViewRenter}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </ScrollView>
        )
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