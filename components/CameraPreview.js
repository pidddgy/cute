import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class CameraPreview extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    facepos: [],
  };

  async componentDidMount() {
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
            >
          <View style={{flex: 1, backgroundColor: 'transparent'}}>

            <Text> H </Text>
            
          </View>
          </Camera>
        </View>

      );
    }
  }
}
