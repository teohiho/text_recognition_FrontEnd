import { createStackNavigator } from 'react-navigation';

import HomeScreen from './../screens/HomeScreen';


// import TwitterScreen from './screens/twitter/TwitterScreen';
// import QQBrowserScreen from './screens/qqbrowser/QQBrowserScreen';

export const createStack = () => createStackNavigator(
    {
      HomeScreen,
    },
    {
      headerMode: 'none',
    },
  );