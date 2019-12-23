import React, { Component } from 'react';
import { 
  StyleSheet,
  View
} from 'react-native'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import 'react-native-gesture-handler'
import { px2dp, px2sp } from './app/utils/SizeUtils';
import HomeScreen from './app/screens/HomeScreen.js'
import ROIScreen from './app/screens/ROIScreen.js'



const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  ROI: {
    screen: ROIScreen
  },

},{
  initialRouteName: "Home"
});
const AppContainer = createAppContainer(RootStack);



export default class App extends Component {
  render() {
    return (  
      <AppContainer style={ styles.styleApp } />
    );
  }
}

const styles = StyleSheet.create({
  styleApp: {
    backgroundColor: '#626262',
  },

});