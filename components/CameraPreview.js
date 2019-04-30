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
            style={{ flex: 1 }}
            onFacesDetected={this.handleFacesDetected.bind(this)}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.none,
            }}
            ratio="16:9"
            >


           {
              this.state.facepos.map(function(face, index) {
                return(
                  <Image source={require('../assets/dreadlocks.png')} key={index}
                      style={{
                        width:100, 
                        height:100,
                        left: face.bounds.origin.x,
                        top: face.bounds.origin.y,
                        position:"absolute",
                      }}> 
                    </Image>
                  

                )
                
              })
            }
            
            
          </Camera>

          </View>
          

      );
    }
  }
}
