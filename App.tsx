import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BeamCanvas, CanvasInitArgs } from './components/BeamCanvas';

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
      <BeamCanvas width={300} height={300} onInit={draw} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
