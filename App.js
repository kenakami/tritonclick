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
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
        Page: {
            screen: HomePage,
            navigationOptions: {
                gesturesEnabled: false,
                header: null,
            }
        },
        Rep : {
            screen: Report,
            navigationOptions: {
                title: "Settings",
            }
        },
        Price : {
            screen: PriceTrends,
            navigationOptions: {
                title: "Price Trends"
            }
        },
        ListingBuyer : {
            screen: viewListingsBuyer,
            navigationOptions: {
                title: "Buy"
            }
        },
        ListingRent : {
            screen: viewListingsRent,
            navigationOptions: {
                title: "Rent"
            }
        },
        ListingSeller : {
            screen: viewListingsSeller,
            navigationOptions: {
                title: "Sell Listing"
            }
        },
        ListingLoan : {
            screen: viewListingsLoan,
            navigationOptions: {
                title: "Loan Listing"
            }
        },
        myListings: {
            screen: myListings,
            navigationOptions: {
                title: "My Listings"
            }
        },
        item: Item,
		chat: {
            screen: Chat,
            navigationOptions: {
                title: "Messages"
            }
        },
        loan: {
            screen: Loan,
            navigationOptions: {
                title: "Loan Form"
            }
        },
        sell: {
            screen: Sell,
            navigationOptions: {
                title: "Sell Form"
            }
        },
        displayBuy : {
            screen: DisplayBuy,
            navigationOptions: {
                title: "Buy"
            }
        },
        displayRent : {
            screen: DisplayRent,
            navigationOptions: {
                title: "Rent"
            }
        }

    },
    {
        initialRouteName: 'Login', //What should show up first when app opens
        defaultNavigationOptions: {
            title: 'TritonClick',
            headerBackTitle: 'Back'
        },
    }
);

export default createAppContainer(navigator);
