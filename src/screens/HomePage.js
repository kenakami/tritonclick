import React from 'react';
import { Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class HomePage extends React.Component {
   render() {
       return (
           <ScrollView style={{
               flex: 1,
               justifyContent: "center",
               paddingHorizontal: 10,
               backgroundColor: color = 'azure',
               paddingTop: 20
           }}>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BR')}>
                   <Text style={styles.text}>Buy</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BR')}>
                   <Text style={styles.text}>Rent</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('form')}>
                   <Text style={styles.text}>Sell</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('form')}>
                   <Text style={styles.text}>Rent Out</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('myListings')}>
                   <Text style={styles.text}>View My Listings</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Price')}>
                   <Text style={styles.text}>Price Trends</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Rep')}>
                   <Text style={styles.text}>Reports</Text>
               </TouchableOpacity>

               <Button title="Sign out" onPress={() => firebase.auth().signOut()}/>
           </ScrollView>
       )
   }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10
    }
});

