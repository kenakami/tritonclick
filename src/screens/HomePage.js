import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const HomePage = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, backgroundColor: color = 'azure' }}>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('BR')}>
                <Text style={styles.text} >Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('BR')}>
                <Text style={styles.text}>Rent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('form')}>
                <Text style={styles.text} >Sell</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('form')}>
                <Text style={styles.text}>Rent Out</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Current')}>
                <Text style={styles.text} >View My Listings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Price')}>
                <Text style={styles.text} >Price Trends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Report')}>
                <Text style={styles.text} >Reports</Text>
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

export default HomePage;
