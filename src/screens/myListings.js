import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';


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
];


function Item({ picture, description, price }) {
    return (
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate('ListingBuyer')}>
            <Text style={{marginLeft: 10, marginRight: 20}}>{picture}</Text>
            <Text style={{marginRight: 50}}>{description}</Text>
            <Text>{price}</Text>
        </TouchableOpacity>
    );
}

const myListings = (props) =>{
    return(

     <View style={styles.container}>
         <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30}}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Sort</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Filter</Text>
            </TouchableOpacity>
         </View>
         <View style={{flexDirection:'row', justifyContent: 'flex-start', backgroundColor: '#DDDDDD', padding: 10}}>
            <Text style={{marginLeft: 10, marginRight: 20}}>
                 Image
            </Text>
            <Text style={{marginRight: 80}}>
                Description
            </Text>
            <Text>
                Price
            </Text>
         </View>


         <View style={styles.container}>
             <FlatList
                 data={DATA}
                 renderItem={({ item }) => (
                     <Item
                         picture={item.picture}
                         description={item.description}
                         price={item.price}
                     />
                 )}
                 keyExtractor={item => item.id}
             />
         </View>
     </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:20
    },
    text: {
        fontSize: 16
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});

export default myListings;