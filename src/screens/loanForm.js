import * as React from 'react';
import { Button, Image, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import { Dropdown } from 'react-native-material-dropdown';


export default class loanForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            barcode: '',
            price: '',
            type: '',
            condition: '',
        };
    }

    state = {
        image: null,
    };
    writeUserData(Email, Barcode, Price, Type, Condition) {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/Loan/`).push({
            Email,
            Barcode,
            Price,
            Type,
            Condition,

        }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }

    render() {
        let { image } = this.state;

        let type = [{
            value: 'iClicker 1',
        }, {
            value: 'iClicker 2',
        }];

        let cond = [{
            value: 'Like New',
        }, {
            value: 'Used',
        }];

        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your Email"
                            maxLength={20}
                            keyboardType="email-address"
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />

                        <View>
                            <Text style={styles.text}>Barcode:</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Barcode"
                                maxLength={8}
                                autoCorrect={false}
                                onChangeText={(barcode) => this.setState({ barcode })}
                                value={this.state.barcode}
                            />
                        </View>

                        <Text style={styles.text}>Price:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Price"
                            keyboardType="numeric"
                            onChangeText={(price) => this.setState({ price })}
                            value={this.state.price}
                        />


                        <Dropdown
                            label='Type of iClicker'
                            data={type}
                            onChangeText={(type) => this.setState({ type })}
                            value={this.state.type}
                        />

                        <Dropdown
                            label='Condition of iClicker'
                            data={cond}
                            onChangeText={(condition) => this.setState({ condition })}
                            value={this.state.condition}
                        />
                        <Button
                            title="Choose an image from camera roll"
                            onPress={this._pickImage}
                        />

                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                style={styles.saveButton} onPress={() => {
                                    if (this.state.email === '') {
                                        alert("All Fields Required!");
                                    }
                                    else if (this.state.barcode === '') {
                                        alert("All Fields Required!");
                                    }
                                    else if (this.state.price === '') {
                                        alert("All Fields Required!");
                                    }
                                    else if (this.state.type === '') {
                                        alert("All Fields Required!");
                                    }
                                    else if (this.state.condition === '') {
                                        alert("All Fields Required!");
                                    }
                                    else {
                                        this.writeUserData(this.state.email, this.state.barcode, this.state.price, this.state.type, this.state.condition);
                                        //Vibration.vibrate(1000);
                                        this.props.navigation.goBack();
                                    }
                                }
                                }
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

            </View>
        );
    }


    componentDidMount() {
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.uploadImage(result.uri, this.state.barcode)
            this.setState({ image: result.uri });
        }
    };

    uploadImage = async (uri, imageName) => {
        const { currentUser } = firebase.auth();
        var str = "users/" + `${currentUser.uid}` + "/Loan/";

        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child(str + imageName);
        return ref.put(blob);
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
        height: 50,
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
