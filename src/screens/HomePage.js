import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity,ScrollView } from 'react-native';

const HomePage = (props) => {
    return (
        <ScrollView contentContainerStyle={{ justifyContent: "center", paddingHorizontal: 10, backgroundColor: color = '#6cb0d0', paddingTop: 20}}>
            <View style={styles.iclicker}>
                <View>
                    <View style={styles.leftBox} />
                    <View style={styles.rightBox} />
                </View>

                <View style={styles.cross}>
                    <View style={styles.crossUp} />
                    <View style={styles.crossFlat} />
                </View>

                <View>
                    <View style={styles.del} />
                    <View style={styles.delRight} />
                </View>


                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('BR')}>
                    <Text style={styles.text} >Buy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('BR')}>
                    <Text style={styles.text}>Rent</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('sell')}>
                    <Text style={styles.text} >Sell</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('loan')}>
                    <Text style={styles.text}>Loan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('myListings')}>
                    <Text style={styles.text} >View My Listings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Price')}>
                    <Text style={styles.text} >Price Trends</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Rep')}>
                    <Text style={styles.text} >Settings</Text>
                </TouchableOpacity>


            </View>
            {/*<Button title="Sign out" onPress={() => firebase.auth().signOut()} />*/}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 20,
        width: "70%",
        borderRadius: 10,
        shadowOffset: { width: 3, height: 10, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,


    },
    cross: {
        alignSelf: "center",
        paddingBottom: 10
    },

    crossUp: {
        backgroundColor: '#DDDDDD',
        height: 100,
        width: 20,

        shadowOffset: { width: 3, height: 6, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,
    },
    crossFlat: {
        backgroundColor: '#DDDDDD',
        height: 20,
        width: 100,
        position: 'absolute',
        left: -40,
        top: 40,

        shadowOffset: { width: 3, height: 6, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,
    },
    del: {
        borderRadius: 50/2,
        height: 50,
        width: 50,
        backgroundColor: '#DDDDDD',
        marginLeft: 50,
        marginBottom: 20,

        shadowOffset: { width: 3, height: 6, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,
    },
    delRight: {
        borderRadius: 50 / 2,
        height: 50,
        width: 50,
        position: 'absolute',
        right: -10,
        backgroundColor: '#DDDDDD',
        marginRight: 50,
        marginBottom: 20,

        shadowOffset: { width: 3, height: 6, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,

    },
    leftBox:{
        borderRadius: 10,
        height: 30,
        width: 70,
        
        backgroundColor: '#DDDDDD',
        marginLeft: 50,
        marginBottom: 10,

        shadowOffset: { width: 3, height: 6, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,
    },
    rightBox:{
        borderRadius: 10,
        height: 30,
        width: 70,
     
        position: 'absolute',
        right: -10,
        backgroundColor: '#DDDDDD',
        marginRight: 50,
        marginBottom: 10,

        shadowOffset: { width: 3, height: 6, },
        shadowColor: '#9A9A9A',
        shadowOpacity: 1.0,
    },
    iclicker:{
        alignSelf:'center',
        flex: 1,
        height: "100%",
        width: "80%",
        backgroundColor: 'black',
        borderRadius:10,

    }
});

export default HomePage;
