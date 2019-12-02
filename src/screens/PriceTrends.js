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
        };
}
render() {
	let type = [{
	  value: 'month',
	}, {
	  value: 'year',
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


return(
	<View style={styles.container}>

	  <ScrollView>
		   <View style={styles.inputContainer}>
			   <Dropdown
			     label='Time'
			     data={type}
			     onChangeText={(time) => this.setState({ time })}
			     time ={this.state.time}
			   />
			    <Text>
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
  }

});
