import * as React from 'react';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet, View } from 'react-native';
import { CanvasDrawArgs, CustomCanvas } from './components/CustomCanvas';

const PADDING = 10;
const RATIO = 9 / 16;
const WIDTH = Dimensions.get('window').width - PADDING * 2;
const HEIGHT = WIDTH * RATIO;

export default function App() {
  const drawHandler = ({ draw, size }: CanvasDrawArgs) => {
    const [width, height] = size;

    draw.path({
      pos: [110, 110],
      path: [
        [width / 3, height / 3],
        [100, 100],
        [0, 100],
        [0, 0],
      ],
      lineWidth: 5,
      scale: [1, 1],
      onClick: () => {
        console.log('line ');
      },
    });

    draw.path({
      pos: [100, height / 2],
      path: [
        [50, 0],
        [50, 50],
        [0, 50],
        [0, 0],
      ],
      color: '#ff0000',
      scale: [1, 1],
      onClick: () => {
        console.log('square ');
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <CustomCanvas width={WIDTH} height={HEIGHT} onDraw={drawHandler} />
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
