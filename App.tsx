import * as React from 'react';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BeamCanvas, CanvasInitArgs } from './components/BeamCanvas';

const PADDING = 10;
const RATIO = 9 / 16;
const WIDTH = Dimensions.get('window').width - PADDING * 2;
const HEIGHT = WIDTH * RATIO;

export default function App() {
  function draw({ context }: CanvasInitArgs) {
    context.beginPath();
    context.strokeStyle = '#bbb';
    context.lineWidth = 6;
    context.moveTo(300, 320);
    context.lineTo(0, 0);

    context.stroke();
    context.closePath();
  }

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <BeamCanvas width={WIDTH} height={HEIGHT} onInit={draw} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: PADDING,
  },
  canvasWrapper: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
