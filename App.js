import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraPreview from './components/CameraPreview';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CameraPreview> </CameraPreview>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
