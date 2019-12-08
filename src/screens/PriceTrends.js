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
	<View style={{ justifyContent: "center", paddingHorizontal: 10, backgroundColor: color = '#6cb0d0', paddingTop: 20 }}>

	  <ScrollView>
		   <View style={styles.iclicker}>


			     <Text style={styles.headertext} >
			          2019 Iclicker 2 Price Trends
			     </Text>
			     <LineChart
			       data={linedata}
			       width={313}
			       height={320}
			       yAxisLabel={'$'}
			       chartConfig={{
			         //backgroundColor: '#e26a00',
					 backgroundColor: '#496e56',
			         backgroundGradientFrom: '#496e56',
			         backgroundGradientTo: '#496e56',
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
				alert(1)
																this.setDataSet();
															}} > FWD </Text>
		</TouchableOpacity>
	</View>



	<View style={styles.inputContainer}>
		<TouchableOpacity
			style={styles.leftBox}
		>
			<Text style={styles.saveButtonText} onPress={() => {this.shiftLabels(true);

			alert(2);
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

<Text style ={styles.text}  >A</Text>
<View style={styles.button} >
	<Text style={styles.text} ></Text>
</View>


<Text style ={styles.text}  >B</Text>
<View style={styles.button} >
	<Text style={styles.text} ></Text>
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
  text: {
	  fontSize: 30,
	  textAlign: 'center'

  },
  headertext: {
	fontSize: 22,
	textAlign: 'center'

  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  button: {
	  alignSelf: 'center',
	  alignItems: 'center',
	  backgroundColor: '#B0B0B0',
	  padding: 10,
	  marginBottom: 20,
	  width: "70%",
	  borderRadius: 10,
	  shadowOffset: { width: 3, height: 10, },
	  shadowColor: '#9A9A9A',
	  shadowOpacity: 1.0,


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
    borderColor: '#B0B0B0',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },

cross: {
	alignSelf: "center",
	paddingBottom: 10
},

crossUp: {
	backgroundColor: '#B0B0B0',
	height: 100,
	width: 20,

	shadowOffset: { width: 3, height: 6, },
	shadowColor: '#9A9A9A',
	shadowOpacity: 1.0,
},
crossFlat: {
	backgroundColor: '#B0B0B0',
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
	backgroundColor: '#278191',
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
	backgroundColor: '#BF7104',
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

	backgroundColor: '#B0B0B0',
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
	bottom: -53,
	backgroundColor: '#B0B0B0',
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
	backgroundColor: '#D0D0D0',
	borderRadius:10,

}
});
