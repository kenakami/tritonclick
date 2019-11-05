import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const HomeScreen = (props) => {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: color = 'azure' }}>
      <Text style={{ fontSize: 30, color: 'firebrick' }} onPress={() => alert('Bye')} >Hello, world!</Text>
      
      <Button
        title="Go to Components Demo"
        onPress = { () => props.navigation.navigate('Components') }   //method to navigate between different screens        
        >
      </Button>
      
      {/*Same as abutton but more customizable*/}
      <TouchableOpacity onPress= { () => props.navigation.navigate('List')}>    
        <Text>Go to list Demo</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
