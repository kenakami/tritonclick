import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const viewListingsTest = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, backgroundColor: color = 'azure' }}>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ListingBuy')}>
                <Text style={styles.text} >ListingBuy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ListingRent')}>
                <Text style={styles.text}>ListingRent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ListingSell')}>
                <Text style={styles.text} >ListingSell</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ListingLoan')}>
                <Text style={styles.text}>ListingLoan</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 20
    }
});

export default viewListingsTest;
