import React from 'react'
import { View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native'
import { px2dp, px2sp } from '../utils/SizeUtils';
import { SvgCss, Svg, Rect, Circle, Path  } from 'react-native-svg';
import { Sketch } from 'react-native-sketch';
import RecognitionScreen from './RecognitionScreen.js'
// import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
// import CustomCrop from "react-native-perspective-image-cropper";
// import ImagePicker from 'react-native-image-crop-picker';

const {heightW, widthW} = Dimensions.get('window');


export default class ROIScreen extends React.Component {
  // constructor(props){
  //   super(props);
  //   this._panResponder={};
  //   this._previousLeft = 0;
  //   this._previousTop = 0;
  //   this._circleStyles = {};
  //   this.circle = null;
  // }
  state = {
    dragging: false,
    initialTop: 0,
    initialLeft: 0,
    offsetTop: 0,
    offsetLeft: 0,

    dragging1: false,
    initialTop1: 0,
    initialLeft1: 0,
    offsetTop1: 0,
    offsetLeft1: 0,

    dragging2: false,
    initialTop2: 0,
    initialLeft2: 0,
    offsetTop2: 0,
    offsetLeft2: 0,

    dragging3: false,
    initialTop3: 0,
    initialLeft3: 0,
    offsetTop3: 0,
    offsetLeft3: 0,

    imgScan:null,
    checkTextReturn: 0,
    textRecognition : ''
  }
  panResponder = {}
  panResponder1 = {}
  panResponder2 = {}
  panResponder3 = {}
  
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })

    this.panResponder1 = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder1,
      onPanResponderGrant: this.handlePanResponderGrant1,
      onPanResponderMove: this.handlePanResponderMove1,
      onPanResponderRelease: this.handlePanResponderEnd1,
      onPanResponderTerminate: this.handlePanResponderEnd1,
    })

    this.panResponder2 = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder2,
      onPanResponderGrant: this.handlePanResponderGrant2,
      onPanResponderMove: this.handlePanResponderMove2,
      onPanResponderRelease: this.handlePanResponderEnd2,
      onPanResponderTerminate: this.handlePanResponderEnd2,
    })

    this.panResponder3 = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder3,
      onPanResponderGrant: this.handlePanResponderGrant3,
      onPanResponderMove: this.handlePanResponderMove3,
      onPanResponderRelease: this.handlePanResponderEnd3,
      onPanResponderTerminate: this.handlePanResponderEnd3,
    })
  }


  handleUploadPhoto = () => {
    const data = [{
      "uri": this.props.photo.data, 
      "name":  this.props.photo.fileName, 
      "type": "image/jpeg",
      "x1": (this.state.initialLeft*1.91),
      "x2": (this.state.initialLeft1*1.91),
      "x3": (this.state.initialLeft2*1.91),
      "x4": (this.state.initialLeft3*1.91),
      "y1": (this.state.initialTop*1.91),
      "y2": (this.state.initialTop1*1.91),
      "y3": (this.state.initialTop2*1.91),
      "y4": (this.state.initialTop3*1.91),
    }]
    
    console.log(this.props.photo)
    
    fetch("http://10.0.2.2:5000/predictfourpoints", {
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

  render() {
    const { photo } = this.props
    const {imgScan, textRecognition, checkTextReturn} = this.state
    const {dragging, initialTop, initialLeft, offsetTop, offsetLeft} = this.state
    const {dragging1, initialTop1, initialLeft1, offsetTop1, offsetLeft1} = this.state
    const {dragging2, initialTop2, initialLeft2, offsetTop2, offsetLeft2} = this.state
    const {dragging3, initialTop3, initialLeft3, offsetTop3, offsetLeft3} = this.state
   
    const style = {
      backgroundColor: dragging ? 'skyblue' : 'steelblue',
      top: initialTop + offsetTop,
      left: initialLeft + offsetLeft,
    }

    const style1 = {
      backgroundColor: dragging1 ? 'skyblue' : 'steelblue',
      top: initialTop1 + offsetTop1,
      left: initialLeft1 + offsetLeft1,
    }

    const style2 = {
      backgroundColor: dragging2 ? 'skyblue' : 'steelblue',
      top: initialTop2 + offsetTop2,
      left: initialLeft2 + offsetLeft2,
    }
    const style3 = {
      backgroundColor: dragging3 ? 'skyblue' : 'steelblue',
      top: initialTop3 + offsetTop3,
      left: initialLeft3 + offsetLeft3,
    }

    
    var tyleW = photo.width/widthW
    return (
      <ScrollView style={ styles.fill }>
        <View style={ styles.container }>
          {/*    
          <Svg height="100" width="100">
            <Path
              d="M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25"
              fill="none"
              stroke="red"
            />
          </Svg> */}

          <View style={ { width : "100%" } }>
            <Image
              source={{ uri: photo.uri }}
              style={{ width : 350 , height:  photo.height/11 }}
            />
            <View 
              // {/* Put all panHandlers into the View's props */}
              {...this.panResponder.panHandlers} 
              style={[styles.square, style]}
            > 
              <Text style={styles.text}>1</Text>
            </View>

            <View 
              {...this.panResponder1.panHandlers} 
              style={[styles.square, style1]} 
            >
              <Text style={styles.text}>2</Text>
            </View>

            <View 
              {...this.panResponder2.panHandlers} 
              style={[styles.square, style2]} 
            >
              <Text style={styles.text}>3</Text>
            </View>

            <View 
              {...this.panResponder3.panHandlers} 
              style={[styles.square, style3]} 
            >
              <Text style={styles.text}>4</Text>
            </View>
          </View>

          <View style={styles.toado}>
            <Text style={styles.text}>x1 ( {initialLeft} ; {initialTop} )</Text>
            <Text style={styles.text}>x2 ( {initialLeft1} ; {initialTop1} )</Text>
            <Text style={styles.text}>x3 ( {initialLeft2} ; {initialTop2} )</Text>
            <Text style={styles.text}>x4 ( {initialLeft3} ; {initialTop3} )</Text>
          </View>
          
          <Button onPress={this.handleUploadPhoto} title="Upload" />

          <View style={styles.recognition}>
            {checkTextReturn == 1 && imgScan != '' && (
                <React.Fragment>
                  <RecognitionScreen imgScan = {imgScan} textRecognition={textRecognition}/>
                </React.Fragment>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
  handleStartShouldSetPanResponder = () => {
    return true
  }

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = () => {
    this.setState({dragging: true})
  }

  // Every time the touch/mouse moves
  handlePanResponderMove = (e, gestureState) => {

    // Keep track of how far we've moved in total (dx and dy)
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    })
  }

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    const {initialTop, initialLeft} = this.state

    // The drag is finished. Set the initialTop and initialLeft so that
    // the new position sticks. Reset offsetTop and offsetLeft for the next drag.
    this.setState({
      dragging: false,
      initialTop: initialTop + gestureState.dy,
      initialLeft: initialLeft + gestureState.dx,
      offsetTop: 0,
      offsetLeft: 0,
    })
  }


  // ########## 1 ############
  handleStartShouldSetPanResponder1 = () => {
    return true
  }

  handlePanResponderGrant1 = () => {
    this.setState({dragging1: true})
  }

  handlePanResponderMove1 = (e, gestureState) => {
    this.setState({
      offsetTop1: gestureState.dy,
      offsetLeft1: gestureState.dx,
    })
  }

  handlePanResponderEnd1 = (e, gestureState) => {
    const {initialTop1, initialLeft1} = this.state
    this.setState({
      dragging: false,
      initialTop1: initialTop1 + gestureState.dy,
      initialLeft1: initialLeft1 + gestureState.dx,
      offsetTop1: 0,
      offsetLeft1: 0,
    })
  }

  // ########## 2 ############
  handleStartShouldSetPanResponder2 = () => {
    return true
  }

  handlePanResponderGrant2 = () => {
    this.setState({dragging2: true})
  }

  handlePanResponderMove2 = (e, gestureState) => {
    this.setState({
      offsetTop2: gestureState.dy,
      offsetLeft2: gestureState.dx,
    })
  }

  handlePanResponderEnd2 = (e, gestureState) => {
    const {initialTop2, initialLeft2} = this.state
    this.setState({
      dragging: false,
      initialTop2: initialTop2 + gestureState.dy,
      initialLeft2: initialLeft2 + gestureState.dx,
      offsetTop2: 0,
      offsetLeft2: 0,
    })
  }

  // ########## 3 ############
  handleStartShouldSetPanResponder3 = () => {
    return true
  }

  handlePanResponderGrant3 = () => {
    this.setState({dragging3: true})
  }

  handlePanResponderMove3 = (e, gestureState) => {
    this.setState({
      offsetTop3: gestureState.dy,
      offsetLeft3: gestureState.dx,
    })
  }

  handlePanResponderEnd3 = (e, gestureState) => {
    const {initialTop3, initialLeft3} = this.state
    this.setState({
      dragging: false,
      initialTop3: initialTop3 + gestureState.dy,
      initialLeft3: initialLeft3 + gestureState.dx,
      offsetTop3: 0,
      offsetLeft3: 0,
    })
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ROI:{
    position: 'absolute',
    width: 100,
    height: 100,
  },
  square: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: px2dp(20),
    height: px2dp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: px2dp(12),
  },
  recognition:{
    marginTop: px2dp(64),
    width: 350
  },
  toado:{
    marginTop: px2dp(8),
    marginBottom: px2dp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    // borderColor: '#d6d7da',
    backgroundColor: '#626262',
  }
})