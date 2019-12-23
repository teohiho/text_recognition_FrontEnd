import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  Image,
  Button,
  Text
} from 'react-native'


import 'react-native-gesture-handler'
import { px2dp, px2sp } from '../utils/SizeUtils';






export default class RecognitionScreen extends Component {
  render() {
    const {  imgScan, textRecognition } = this.props
    return (
      <View>
            <Image
                source={{uri: `data:image/jpeg;base64,${imgScan}`}}
                style={{ width: 350, height: 200}}
             />
            <Text style={ styles.itemTextRecognition }>{textRecognition}</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
    itemTextRecognition: {
        fontSize: px2dp(12),
        color: 'white',
        fontWeight: 'bold',
        marginLeft: px2dp(10),
        marginRight: px2dp(10)
    },
  
  });