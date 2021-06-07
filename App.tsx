import * as React from 'react';
import Constants from 'expo-constants';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SvgChart } from './components/SvgChart';

const PADDING = 10;
const RATIO = 9 / 16;
const WIDTH = Dimensions.get('window').width - PADDING * 2;
const HEIGHT = WIDTH * RATIO;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <SvgChart width={WIDTH} height={HEIGHT} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: PADDING,
  },
  svgWrapper: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
