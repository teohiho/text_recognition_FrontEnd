import React, { Component } from 'react';
import { 
  StyleSheet,
  View, 
  Text, 
  Image, 
  Button,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Animated
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { px2dp, px2sp } from '../utils/SizeUtils';
import RecognitionScreen from './RecognitionScreen.js'
import ROIScreen from './ROIScreen.js'

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { RNCamera } from 'react-native-camera';
// import { SafeAreaView } from 'react-navigation';
// import { Images, Colors } from '@app/resource'




const createFormData = async (photo, body) => {
  const data = new FormData();
  data.append("file", {name: 'image.jpg', type: 'image/jpeg'})
  // data.append("photo", {
  //   name: photo.fileName,
  //   type: photo.type,
  //   uri:
  //     Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  // });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};


export default class HomeScreen extends Component {
  state = {
    photo: null,
    imgScan:null,
    checkTextReturn: 0,
    textRecognition : ''
  }


  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  // handleCamera = () => {
  //   return (
  //     <RNCamera></RNCamera>
  //   )
  // }
  
  handleUploadPhoto = () => {
    const data = [{
      "uri": this.state.photo.data, 
      "name":  this.state.photo.fileName, 
      "type": "image/jpeg"
    }]
    
    console.log(this.state.photo)
    
    fetch("http://10.0.2.2:5000/predict", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response)

        var imgScanNe = response["prediction"].imgScan
        console.log("[handleUploadPhoto] imgScan : " + this.state.imgScan)

        var textRecognitionNe = response["prediction"].textRecognition

        alert("Upload success!")
        
        this.setState({ 
          // photo: null,
          imgScan: imgScanNe, 
          checkTextReturn: 1, 
          textRecognition: textRecognitionNe 
        });

      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
      
   
  };

  handleChangeOrigin = () =>{
    this.setState({ 
      photo: null,
      imgScan: null, 
      checkTextReturn: 0, 
      textRecognition: '' 
    });
  }

  render() {
    const { photo, imgScan, checkTextReturn, textRecognition } = this.state
    // console.log("[App] imgScan : " + imgScan)
    console.log("[App] textRecognition : " + textRecognition)
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   {photo && (
      //     <React.Fragment>
      //       <Image
      //         source={{ uri: photo.uri }}
      //         style={{ width: 300, height: 300 }}
      //       />
      //       <Button title="Upload" onPress={this.handleUploadPhoto} />
      //     </React.Fragment>
      //   )}
      //   <Button title="Choose Photo ss" onPress={this.handleChoosePhoto} />
      //   <Button title="Take Photo"/>
      //   <Image
      //         source={{uri: `data:image/jpeg;base64,${imgScan}`}}
      //         style={{ width: 300, height: 300 }}
      //       />

      // </View>
      
      <View style={{ flex: 1, }}>
        <StatusBar barStyle='light-content' backgroundColor='#1e1e23'/>
        <SafeAreaView style={ styles.container }>

          <TouchableOpacity onPress={this.handleChangeOrigin}>
            <View style={ styles.avatarWrap }>
              <Text style={ styles.titleText }>Power .</Text>
              <Image style={ styles.imgAvatar } source={ require('../resource/imgs/avatar1.png') }/>
            </View>
          </TouchableOpacity>

          {checkTextReturn != 1 && (
              <TouchableOpacity style={ styles.itemContainer } onPress={this.handleChoosePhoto}>
                <Text style={ styles.itemText }>Choose Photo</Text>
                <Image style={ styles.itemIcon } source={ require('../resource/imgs/ic_default.png') }/>
              </TouchableOpacity>
          )}
          
          <ScrollView style={ styles.fill }>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

              {checkTextReturn == 1 && imgScan != '' && (
                  <React.Fragment>
                    <RecognitionScreen imgScan = {imgScan} textRecognition={textRecognition}/>
                  </React.Fragment>
              )}
              {checkTextReturn == 1 && imgScan == '' && (
                  <React.Fragment>
                    <ROIScreen photo={photo} />
                  </React.Fragment>
              )}

              {photo &&  checkTextReturn != 1 &&(
                <React.Fragment>
                  <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 350, height: 300 }}
                  />
                  <Button title="Upload" onPress={this.handleUploadPhoto } />
                </React.Fragment>
              )}
            </View>
            <View style={ styles.footer }>
              <Image style={{ width: 402, height: 150}} source={ require('../resource/imgs/ic_presentation.png') }/>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e23',
  },
  avatarWrap: {
    marginBottom:  px2dp(20),
    marginTop: px2dp(10),
    marginLeft: px2dp(-25),
    marginRight: px2dp(30),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: px2dp(20),
    paddingLeft: px2dp(50),
    // paddingRight: px2dp(34),
    borderColor: 'pink',
    borderRadius: 40,
    backgroundColor: '#626262',
  },
  imgAvatar: {
    height: px2dp(64),
    width: px2dp(64),
    resizeMode: 'contain',
    borderRadius: px2dp(200),
  },
  itemContainer: {
    marginBottom: px2dp(16),
    marginHorizontal: px2dp(16),
    borderRadius: px2dp(16),
    paddingHorizontal: px2dp(24),
    paddingVertical: px2dp(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: 'coral',
    // backgroundColor:'#4facfe',
    
    margin: 2,
    
  },
  itemText: {
    fontSize: px2dp(20),
    color: 'white',
    fontWeight: 'bold',
  },
  itemTextRecognition: {
    fontSize: px2dp(12),
    color: 'white',
    fontWeight: 'bold',
    marginLeft: px2dp(10),
    marginRight: px2dp(10)
  },
  itemIcon: {
    height: px2dp(40),
    width:px2dp(40),
    marginLeft: px2dp(16),
    alignContent: 'center',
    resizeMode: 'contain',
  },
  textIntro: {
    position: 'absolute',
    bottom: px2dp(8),
    right: px2dp(8),
    color: '#C0C0C0',
  },
  titleText: {
    fontSize: px2dp(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    // bottom: 0,
    // left: 0,
    position: 'relative',
    marginTop: px2dp(240),
    marginLeft: px2dp(-20),
  }
});

// https://github.com/MarnoDev/react-native-qrcode-scanner-view
// https://github.com/madhavanmalolan/awesome-reactnative-ui