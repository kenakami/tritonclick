import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomePage from './src/screens/HomePage';
import SellRent from './src/screens/SellRent';
import Report from './src/screens/Report';
import PriceTrends from './src/screens/PriceTrends';
import currListings from './src/screens/currListings';
import BuyRent from './src/screens/BuyRent';
import Form from './src/screens/Form';
import Login from './src/screens/Login'




const navigator = createStackNavigator(
  {
   
    Login: Login,
    Page: HomePage,
    SR : SellRent,
    Rep : Report,
    Price : PriceTrends,
    Current : currListings,
    BR : BuyRent,
    form : Form,
   


  },
  {
    initialRouteName: 'Login', //What should show up first when app opens
    defaultNavigationOptions: {
      title: 'TritonClick'
    }
  }
);

export default createAppContainer(navigator);
