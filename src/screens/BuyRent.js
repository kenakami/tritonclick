import React, { Component } from 'react';
import { SafeAreaView, Button, FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Item from "./components/Item";
import displayBuy from "./displayBuy";
import displayRent from "./displayRent";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Description',
        description: 'working',
        price: '$40',

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        description: '1',
        price: '35$',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        description: '1',
        price: '45$',
    },
];

/**
function Item({ id, title, description, price }) {
    return (
        <TouchableOpacity onPress={this.toViewListing}
            style={
                styles.item
                //{ backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
            }
        >
            <Text style={styles.title}>{title}</Text>
            <Text style={{marginRight: 50}}>{description}</Text>
            <Text>{price}</Text>
        </TouchableOpacity>
    );
}
 **/

export default class BuyRent extends React.Component {

    toViewBuyer = () => {
        this.props.navigation.navigate('ListingBuyer');
    };

    toViewSeller = () => {
        this.props.navigation.navigate('ListingSeller');
    };

    toViewRenter = () => {
        this.props.navigation.navigate('ListingRent');
    };

    toViewRentee = () => {
        this.props.navigation.navigate('ListingLoan');
    };
    /**
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );
     **/

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button title="SORT"/>
                    <Button title="FILTER"/>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => (
                        <Item
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            toViewListing={this.toViewBuyer}
                            //selected={!!selected.get(item.id)}
                            //onSelect={onSelect}
                        />
                    )}
                    keyExtractor={item => item.id}
                    //extraData={selected}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

/*const BuyRent = () =>{
    return(
        <View style= {{padding : 50}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="SORT" />
                <Button title="FILTER" />
            </View>
        </View>
        );
}
*/