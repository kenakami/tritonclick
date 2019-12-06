import { createStackNavigator, createAppContainer } from 'react-navigation';

import {Dimensions} from "react-native";
import HomePage from './src/screens/HomePage';
import Report from './src/screens/Report';
import PriceTrends from './src/screens/PriceTrends';
import viewListingsBuyer from "./src/screens/viewListingsBuyer";
import viewListingsRent from "./src/screens/viewListingsRent";
import viewListingsSeller from "./src/screens/viewListingsSeller";
import viewListingsLoan from "./src/screens/viewListingsLoan";
import myListings from "./src/screens/myListings";
import Login from './src/screens/Login';
import Item from './src/screens/components/Item';
import Loan from './src/screens/loanForm';
import Chat from './src/screens/Chat'
import Sell from './src/screens/sellForm';
import EStyleSheet from "react-native-extended-stylesheet";

import DisplayBuy from "./src/screens/displayBuy";
import DisplayRent from "./src/screens/displayRent";


var {height, width} = Dimensions.get('window')
EStyleSheet.build({
    $rem: width / 20
});




const navigator = createStackNavigator(
    {
        Login: Login,
        Page: {
            screen: HomePage,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },

//<<<<<<< HEAD

        Rep : Report,
        Price : PriceTrends,
        ListingBuyer : viewListingsBuyer,
        ListingRent : viewListingsRent,
        ListingSeller : viewListingsSeller,
        ListingLoan : viewListingsLoan,
        myListings: myListings,
        item: Item,
		chat: Chat,
        loan: Loan,
        sell: Sell,
        displayBuy : DisplayBuy,
        displayRent : DisplayRent
//=======
        /*
            Login: Login,
            Page: HomePage,
            SR : SellRent,
            Rep : Report,
            Price : PriceTrends,
            Current : currListings,
            BR : BuyRent,
            form : Form,
          */

//>>>>>>> login
    },
    {
        initialRouteName: 'Login', //What should show up first when app opens
        defaultNavigationOptions: {
            title: 'TritonClick',
            header: null,
        },
    }
);

export default createAppContainer(navigator);
