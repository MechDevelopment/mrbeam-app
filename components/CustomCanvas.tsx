import * as React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import Canvas from 'react-native-canvas';
import { DrawCanvas } from '../assets/ts/DrawCanvas';
import { Point } from '../assets/types/canvas';

const DPI = 2;

export interface CanvasDrawArgs {
  draw: DrawCanvas;
  size: [number, number];
}

interface BeamCanvasProps {
  width: number;
  height: number;
  onDraw: (args: CanvasDrawArgs) => void;
}

export const CustomCanvas = (props: BeamCanvasProps) => {
  const { width, height, onDraw } = props;
  const canvasRef: React.RefObject<Canvas> = React.useRef(null);
  const drawCanvas: DrawCanvas = React.useRef(new DrawCanvas()).current;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width * 2;
      canvas.height = height * 2;
      const context = canvas.getContext('2d');
      context.scale(1 / DPI, 1 / DPI);

      drawCanvas.init(canvas, context);
      onDraw({ draw: drawCanvas, size: [width * 2, height * 2] });
      drawCanvas.render();
    }
  }, [canvasRef, onDraw]);

  const pressHandler = (e: GestureResponderEvent) => {
    const point: Point = [e.nativeEvent.locationX, e.nativeEvent.locationY];
    drawCanvas.pressTrigger(point);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={pressHandler}>
      <Canvas style={{ width, height }} ref={canvasRef} />
    </TouchableOpacity>
  );
};

// draw.path({
//   pos: [110, 110],
//   path: [
//     [width / 3, height / 3],
//     [100, 100],
//     [0, 100],
//     [0, 0],
//   ],
//   lineWidth: 5,
//   scale: [1, 1],
//   onClick: () => {
//     console.log('line ');
//   },
// });

// draw.path({
//   pos: [100, height / 2],
//   path: [
//     [50, 0],
//     [50, 50],
//     [0, 50],
//     [0, 0],
//   ],
//   color: '#ff0000',
//   scale: [1, 1],
//   onClick: () => {
//     console.log('square ');
//   },
// });
//

// <View style={styles.container}>
//   <View style={styles.canvasWrapper}>
//     <CustomCanvas width={WIDTH} height={HEIGHT} onDraw={drawHandler} />
//   </View>
// </View>

// const styles = StyleSheet.create({
//   content: {
//     marginTop: Constants.statusBarHeight,
//     flex: 1,
//   },
//   container: {
//     marginTop: Constants.statusBarHeight,
//     padding: PADDING,
//   },
//   canvasWrapper: {
//     borderColor: 'red',
//     borderWidth: 1,
//   },
// });
