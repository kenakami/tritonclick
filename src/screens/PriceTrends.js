import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    Alert
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import * as firebase from 'firebase';
import {LineChart} from 'react-native-chart-kit';
import EStyleSheet from "react-native-extended-stylesheet";


export default class PriceTrends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: '',
            dataset: [0, 0, 0, 0, 0, 0],
            labels: ['7', '8', '9', '10', '11', '12'],
        };
    }

    setDataSet() {
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
                    if (snapshot.val() && snapshot.val() == '12') {
                        firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                            month5.push(parseFloat(snapshot.val()));

                            this.state.dataset[5] = this.getAverage(month5);
                            this.setState({dataset: this.state.dataset});

                        });
                    } else if (snapshot.val() && snapshot.val() == '11') {
                        firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                            month4.push(parseFloat(snapshot.val()));

                            this.state.dataset[4] = this.getAverage(month4);
                            this.setState({dataset: this.state.dataset});

                        });
                    } else if (snapshot.val() && snapshot.val() == '10') {
                        firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                            month3.push(parseFloat(snapshot.val()));

                            this.state.dataset[3] = this.getAverage(month3);
                            this.setState({dataset: this.state.dataset});

                        });
                    } else if (snapshot.val() && snapshot.val() == '9') {
                        firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                            month2.push(parseFloat(snapshot.val()));
                            this.state.dataset[2] = this.getAverage(month2);
                            this.setState({dataset: this.state.dataset});

                        });
                    } else if (snapshot.val() && snapshot.val() == '8') {
                        firebase.database().ref('sales/' + child + '/price/').once('value', (snapshot) => {
                            month1.push(parseFloat(snapshot.val()));
                            this.state.dataset[1] = this.getAverage(month1);
                            this.setState({dataset: this.state.dataset});

                        });
                    } else if (snapshot.val() && snapshot.val() == '7') {
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

    getAverage(monthSales) {
        let average = 0;
        if (monthSales.length == 0) {
            return 0;
        }
        for (let i = 0; i < monthSales.length; i++) {
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


        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.inputContainer}>


                        <Text>
                            Iclicker 2 Price Trends
                        </Text>
                        <LineChart
                            data={linedata}
                            width={412}
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


                    </View>
                </ScrollView>

            </View>


        );


    }
}


const styles = EStyleSheet.create({
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
