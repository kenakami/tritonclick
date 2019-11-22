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
import Login from './src/screens/Login';
import Item from './src/screens/components/Item';
import loanForm from "./src/screens/loanForm";
import sellForm from "./src/screens/sellForm";
import EStyleSheet from "react-native-extended-stylesheet";


EStyleSheet.build({
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
        BR : BuyRent,
        item: Item,
        loan: loanForm,
        sell: sellForm
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
