import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomePage from './src/screens/HomePage';
import Report from './src/screens/Report';
import PriceTrends from './src/screens/PriceTrends';
import viewListingsBuyer from "./src/screens/viewListingsBuyer";
import viewListingsRent from "./src/screens/viewListingsRent";
import viewListingsSeller from "./src/screens/viewListingsSeller";
import viewListingsLoan from "./src/screens/viewListingsLoan";
import BuyRent from './src/screens/BuyRent';
import myListings from "./src/screens/myListings";
import Form from './src/screens/Form';
import Login from './src/screens/Login';
import Item from './src/screens/components/Item';
import Loan from './src/screens/loanForm';
import Sell from './src/screens/sellForm';
import EStyleSheet from "react-native-extended-stylesheet";
import Example from "./src/screens/displayBuy";
import Test from "./src/screens/test";
import DisplayBuy from "./src/screens/displayBuy";
import DisplayRent from "./src/screens/displayRent";





EStyleSheet.build({
});




const navigator = createStackNavigator(
    {
        Login: Login,
        Page: {
            screen: HomePage,
            navigationOptions: {
                headerLeft: null,
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
        BR : BuyRent,
        form : Form,
        item: Item,
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
    },

}
);

export default createAppContainer(navigator);