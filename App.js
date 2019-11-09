import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomePage from './src/screens/HomePage';
import SellRent from './src/screens/SellRent';
import Report from './src/screens/Report';
import PriceTrends from './src/screens/PriceTrends';
import currListings from './src/screens/currListings';
import BuyRent from './src/screens/BuyRent';
import Form from './src/screens/Form';
import myListings from "./src/screens/myListings";





const navigator = createStackNavigator(
  {
   

    Page: HomePage,
    SR : SellRent,
    Rep : Report,
    Price : PriceTrends,
    Current : currListings,
    myListings: myListings,
    BR : BuyRent,
    form : Form,
   


  },
  {
    initialRouteName: 'Page', //What should show up first when app opens
    defaultNavigationOptions: {
      title: 'TritonClick'
    }
  }
);

export default createAppContainer(navigator);
