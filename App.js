import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomePage from './src/screens/HomePage';
import SellRent from './src/screens/SellRent';
import Report from './src/screens/Report';
import PriceTrends from './src/screens/PriceTrends';
import viewListingsBuyer from "./src/screens/viewListingsBuyer";
import viewListingsRent from "./src/screens/viewListingsRent";
import viewListingsSeller from "./src/screens/viewListingsSeller";
import viewListingsLoan from "./src/screens/viewListingsLoan";
import BuyRent from './src/screens/BuyRent';
import myListings from "./src/screens/myListings";
import Form from './src/screens/Form';
import Login from './src/screens/Login'




const navigator = createStackNavigator(
  {
   
//<<<<<<< HEAD

      Login: Login,
      Page: HomePage,
      SR : SellRent,
      Rep : Report,
      Price : PriceTrends,
      ListingBuyer : viewListingsBuyer,
      ListingRent : viewListingsRent,
      ListingSeller : viewListingsSeller,
      ListingLoan : viewListingsLoan,
      myListings: myListings,
      BR : BuyRent,
      form : Form,
//=======
/*
    Login: Login,
    Page: HomePage,
    SR : SellRent,
    Rep : Report,
    Price : PriceTrends,
<<<<<<< HEAD
    ListingBuyer : viewListingsBuyer,
    ListingSeller : viewListingsSeller,
    ListingRent : viewListingsRent,
    ListingLoan : viewListingsLoan,
    myListings: myListings,
=======
    Current : currListings,
>>>>>>> af4db3c5e2875a98619092fb4e2821c586dc68c0
    BR : BuyRent,
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
