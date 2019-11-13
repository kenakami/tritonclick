import React, { Component } from 'react';
import { SafeAreaView, Button, FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Description',
    price: '$40',

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ id, title, selected, onSelect }) {
  const {navigate} = this.props.navigation;
  return (
    <TouchableOpacity
      //onPress={() => onSelect(id)}
      onPress={() => navigate('Page')}
      //onPress={() => this.props.navigation.navigate('Page')}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const BuyRent = (props) =>{
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button title="SORT" />
            <Button title="FILTER" />
        </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title + ' ' + item.price}
            price={item.price}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
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
export default BuyRent;
