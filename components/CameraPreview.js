import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class CameraPreview extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    facepos: [],
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async handleFacesDetected (e) {
    this.setState({
      facepos: e.faces,
    })

    console.log(this.state.facepos);
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        
        <View style={{ flex: 1 }}>
          
          <Camera
            style={{ flex: 1, zIndex:-1 }}
            onFacesDetected={this.handleFacesDetected.bind(this)}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.accurate,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.none,
            }}
            ratio="16:9"
            >

          </Camera>
          {
                this.state.facepos.map((face, index) => {
                 return(
                  <Image source={require('../assets/dreadlocks.png')} key={index}
                  style={{
                    width:face.bounds.size.width*1.5, 
                    height:face.bounds.size.height*1.5,
                    left: face.bounds.origin.x-face.bounds.size.width/5,
                    top: face.bounds.origin.y,
                    position:"absolute",
                  }}> 
                </Image> 
                 )
                })
          }

          </View>
          

      );
    }
  }
}
