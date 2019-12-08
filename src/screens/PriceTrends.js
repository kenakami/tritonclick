import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as firebase from 'firebase';
import { LineChart } from 'react-native-chart-kit';


export default class PriceTrends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: '',
			dataset: [0, 0, 0, 0, 0, 0],
			labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			months: ['7', '8', '9', '10', '11', '12'],
			index: 6,
        };
}
shiftLabels(left) {
var allLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var newmonths = this.state.months;
var currLabels = this.state.labels;
var newindex = this.state.index;
if(left)
{

	if(this.state.index == 0)
	{

	}
	else
	{
	for( var i = 0; i < newmonths.length; i++)
	{
		newmonths[i] -= 1;
	}
	let month = allLabels[newindex - 1];
	currLabels.pop();
	currLabels.unshift(month);
	this.setState({ months: newmonths });
	newindex -= 1;
	this.setState({ labels: currLabels });
	}
}

else
{
	if(this.state.index == 6)
	{
		return;
	}
	else
	{


		for( var i = 0; i < newmonths.length; i++)
		{
			newmonths[i] += 1;
		}
		let month = allLabels[newindex + 6];

		currLabels.shift();
		currLabels.push(month);
		this.setState({ months: newmonths });
		newindex += 1;
		this.setState({ labels: currLabels });



	}
}
this.setState({ index: newindex });
}
setDataSet() {

	this.setState({ dataset: [0, 0, 0, 0, 0, 0] });
	/*let ref0 = firebase.database().ref('sales/' + this.state.labels[0]);
	let ref1 = firebase.database().ref('sales/' + this.state.labels[1]);
	let ref2 = firebase.database().ref('sales/' + this.state.labels[2]);
	let ref3 = firebase.database().ref('sales/' + this.state.labels[3]);
	let ref4 = firebase.database().ref('sales/' + this.state.labels[4]);
	let ref5 = firebase.database().ref('sales/' + this.state.labels[5]);
	var that = this;

    ref0.once("value")
	 .then(function(snapshot) {
	   const val = snapshot.val();

	   let data = that.state.dataset;
	   data[0]  = val;
	   that.setState({ dataset: data });


	 });
	 ref1.once("value")
 	 .then(function(snapshot) {
 	   const val = snapshot.val();

 	   let data = that.state.dataset;
 	   data[1]  = val;
 	   that.setState({ dataset: data });


 	 });
	 ref2.once("value")
	  .then(function(snapshot) {
		const val = snapshot.val();

		let data = that.state.dataset;
		data[2]  = val;
		that.setState({ dataset: data });


	  });
	  ref3.once("value")
	   .then(function(snapshot) {
		 const val = snapshot.val();

		 let data = that.state.dataset;
		 data[3]  = val;
		 that.setState({ dataset: data });


	   });
	   ref4.once("value")
		.then(function(snapshot) {
		  const val = snapshot.val();

		  let data = that.state.dataset;
		  data[4]  = val;
		  that.setState({ dataset: data });


		});
		ref5.once("value")
		 .then(function(snapshot) {
		   const val = snapshot.val();

		   let data = that.state.dataset;
		   data[5]  = val;
		   that.setState({ dataset: data });


         });*/

    const month0 = [];
    const month1 = [];
    const month2 = [];
    const month3 = [];
    const month4 = [];
    const month5 = [];
    firebase.database().ref('sales/').on('value', (snapshot) => {
        let children = Object.keys(snapshot.val());
        children.forEach((child) => {
            //alert(child);
            //alert(child);
            firebase.database().ref('sales/' + child + '/month/').once('value', (snapshot) => {
                if(snapshot.val() && snapshot.val() == this.state.months[5]){
                    firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                        month5.push(parseFloat(snapshot.val()));

                        this.state.dataset[5] = this.getAverage(month5);
                        this.setState({dataset: this.state.dataset});


                    });
                }else if(snapshot.val() && snapshot.val() == this.state.months[4]){
                    firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                        month4.push(parseFloat(snapshot.val()));

                        this.state.dataset[4] = this.getAverage(month4);
                        this.setState({dataset: this.state.dataset});

                    });
                }else if(snapshot.val() && snapshot.val() == this.state.months[3]){
                    firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                        month3.push(parseFloat(snapshot.val()));

                        this.state.dataset[3] = this.getAverage(month3);
                        this.setState({dataset: this.state.dataset});

                    });
                }else if(snapshot.val() && snapshot.val() == this.state.months[2]){
                    firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                        month2.push(parseFloat(snapshot.val()));
                        this.state.dataset[2] = this.getAverage(month2);
                        this.setState({dataset: this.state.dataset});

                    });
                }else if(snapshot.val() && snapshot.val() == this.state.months[1]){
                    firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                        month1.push(parseFloat(snapshot.val()));
                        this.state.dataset[1] = this.getAverage(month1);
                        this.setState({dataset: this.state.dataset});

                    });
                }else if(snapshot.val() && snapshot.val() == this.state.months[0]){
                    firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                        month0.push(parseFloat(snapshot.val()));
                        this.state.dataset[0] = this.getAverage(month1);
                        this.setState({dataset: this.state.dataset});

                    });
                }
            });

        });
    });

}

getAverage(monthSales){
    let average = 0;
    if(monthSales.length == 0){
        return 0;
    }
    for(let i = 0; i < monthSales.length; i++){
        average += monthSales[i];
    }
    return average / monthSales.length;
}

componentDidMount() {

this.setDataSet();

}

render() {


	const linedata = {
    //  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
	labels: this.state.labels,
      datasets: [
        {
          //data: [20, 45, 28, 80, 99, 43],
		  data: this.state.dataset,
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
	<View style={{ justifyContent: "center", paddingHorizontal: 10, backgroundColor: color = 'white', paddingTop: 20 }}>

	  <ScrollView>
		   <View style={styles.iclicker}>


			     <Text>
			          2019 Iclicker 2 Price Trends
			     </Text>
			     <LineChart
			       data={linedata}
			       width={313}
			       height={440}
			       yAxisLabel={'$'}
			       chartConfig={{
			         //backgroundColor: '#e26a00',
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


<View>
	<View style={styles.inputContainer}>
		<TouchableOpacity
			style={styles.rightBox}
		>
			<Text style={styles.saveButtonText} onPress={() => {this.shiftLabels(false);

																this.setDataSet();
															}} > FWD </Text>
		</TouchableOpacity>
	</View>



	<View style={styles.inputContainer}>
		<TouchableOpacity
			style={styles.leftBox}
		>
			<Text style={styles.saveButtonText} onPress={() => {this.shiftLabels(true);


																this.setDataSet();
															}} > BACK </Text>
		</TouchableOpacity>
	</View>

</View>

<View style={styles.cross}>
	<View style={styles.crossUp} />
	<View style={styles.crossFlat} />
</View>

<View>
	<View style={styles.del} />
	<View style={styles.delRight} />
</View>




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
	bottom: -54,
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
  	backgroundColor: '#474747',
  	borderRadius:10,

  }
});
