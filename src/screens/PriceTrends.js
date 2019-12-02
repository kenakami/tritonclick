import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import { LineChart } from 'react-native-chart-kit';


export default class PriceTrends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: '',
			dataset: [0, 0, 0, 0, 0, 0],
            labels: ['','','','','',''],
            type: '',
            condition: '',
        };
}
render() {
	let time = [{
	  value: 'month',
	}, {
	  value: 'year',
    }];
    
    let type = [{
        value: 'iClicker 1',
    }, {
        value: 'iClicker 2',
    }];

    let condition = [{
        value: 'Like New',
    }, {
        value: 'Used',
    }];

	const linedata = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          strokeWidth: 2, // optional
        },
      ],
    };

/*
Should go before time dropdown in return statement
<Dropdown
    label='Type of iClicker'
    data={type}
    onChangeText={(type) => this.setState({ type })}
    value={this.state.type}
  />
  <Dropdown
    label='Condition of iClicker'
    data={condition}
    onChangeText={(condition) => this.setState({ condition })}
    value={this.state.condition}
  />

   <View style={styles.inputContainer}>
       <TouchableOpacity style={styles.saveButton} onPress={() => {
           if (this.state.time === '') {
                           alert("All Fields Required!");
           }else if (this.state.condition === '') {
                           alert("All Fields Required!");
           }else if (this.state.type === '') {
                           alert("All Fields Required!");
           }else{
               // Call on function that creates graph based on the fields that they put.
           }}}>
           <Text style={styles.saveButtonText}>Show Graph</Text>
       </TouchableOpacity>
   </View>
*/
return(
	<View style={styles.container}>

	  <ScrollView>
		   <View style={styles.inputContainer}>
			   <Dropdown
			     label='Time'
			     data={time}
			     onChangeText={(time) => this.setState({ time })}
			     time ={this.state.time}
			   />
			    <Text style={styles.heading}>
			        Iclicker 2 Price Trends
			    </Text>
			    <LineChart
			        data={linedata}
			        width={412}
			        height={440}
			        yAxisLabel={'$'}
			        chartConfig={{
			        backgroundColor: '#e26a00',
			        backgroundGradientFrom: '#fb8c00',
			        backgroundGradientTo: '#ffa726',
			        decimalPlaces: 2, // optional, defaults to 2dp
			        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
			        }}
			        bezier
			        style={{
			            marginVertical: 8,
			            borderRadius: 16
			        }}
			     />

	</View>
	    </ScrollView>

	</View>

    );

}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 125,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 12
  },
  heading:{
    fontSize: 20,
    textAlign: 'center',

  }

});
