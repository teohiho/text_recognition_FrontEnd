import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import TakePhoto from './src/TakePhoto'


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


export default class Upload extends React.Component {
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Button title="Take Photo"/>
        <Image
              source={{uri: `data:image/jpeg;base64,${imgScan}`}}
              style={{ width: 300, height: 300 }}
            /> */}
        abc
      </View>
    )
  }
}



