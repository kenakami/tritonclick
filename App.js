import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomePage from './src/screens/HomePage';
import SellRent from './src/screens/SellRent';
import Report from './src/screens/Report';
import PriceTrends from './src/screens/PriceTrends';
import viewListingsBuyer from "./src/screens/viewListingsBuyer";
import viewListingsRentee from "./src/screens/viewListingsRentee";
import viewListingsSeller from "./src/screens/viewListingsSeller";
import viewListingsRenter from "./src/screens/viewListingsRenter";
import BuyRent from './src/screens/BuyRent';
import myListings from "./src/screens/myListings";
import Form from './src/screens/Form';
import Login from './src/screens/Login';
import Item from './src/screens/components/Item';
import EStyleSheet from "react-native-extended-stylesheet";


EStyleSheet.build({
});

const navigator = createStackNavigator(
    {

//<<<<<<< HEAD

        Login: Login,
        Page: HomePage,
        SR : SellRent,
        Rep : Report,
        Price : PriceTrends,
        ListingBuyer : viewListingsBuyer,
        ListingRentee : viewListingsRentee,
        ListingSeller : viewListingsSeller,
        ListingRenter : viewListingsRenter,
        myListings: myListings,
        BR : BuyRent,
        form : Form,
        item: Item
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
            title: 'TritonClick'
        }
    }
);

export default createAppContainer(navigator);
