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
  SafeAreaView
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { px2dp, px2sp } from './../utils/SizeUtils';
// import { SafeAreaView } from 'react-navigation';
// import { Images, Colors } from '@app/resource'
// import { createStackNavigator } from 'react-navigation-stack'
import LinearGradient from 'react-native-linear-gradient';



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
    imgScan:null
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

        alert("Upload success!")
        this.setState({ photo: null,imgScan: imgScanNe });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
      
   
  };


  render() {
    const { photo, imgScan } = this.state
    console.log("[App] imgScan : " + imgScan)
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
      <View style={{ flex: 1}}>
        <StatusBar barStyle='light-content' backgroundColor='#1e1e23'/>
        <SafeAreaView style={ styles.container }>
          <View style={ { flex: 1 } }>
            <View style={ styles.avatarWrap }>
              <Text style={ styles.titleText }>Teo</Text>
              <Image style={ styles.imgAvatar } source={ require('./../resource/imgs/avatar.png') }/>
            </View>

            <TouchableOpacity style={ styles.itemContainer } onPress={this.handleChoosePhoto}>
              <Text style={ styles.itemText }>Choose Photo</Text>
              <Image style={ styles.itemIcon } source={ require('./../resource/imgs/ic_default.png') }/>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {photo && (
            <React.Fragment>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 200, height: 200 }}
              />
              <Button title="Upload" onPress={this.handleUploadPhoto} />
            </React.Fragment>
          )}
          </View>
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
    marginBottom:  px2dp(32),
    marginTop: px2dp(24),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: px2dp(24),
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
});


