import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Canvas from 'react-native-canvas';
import { DrawCanvas } from '../assets/ts/DrawCanvas';

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

  const pressHandler = (e: any) => {
    const point = [e.nativeEvent.locationX, e.nativeEvent.locationY];
    drawCanvas.pressTrigger(point);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={pressHandler}>
      <Canvas style={{ width, height }} ref={canvasRef} />
    </TouchableOpacity>
  );
};
