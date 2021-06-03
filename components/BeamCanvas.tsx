import * as React from 'react';
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';

const DPI = 2;

export interface CanvasInitArgs {
  canvas: Canvas;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
}

interface BeamCanvasProps {
  width: number;
  height: number;
  onInit: (args: CanvasInitArgs) => void;
}

export const BeamCanvas = ({ width, height, onInit }: BeamCanvasProps) => {
  const canvasRef: React.RefObject<Canvas> = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width * 2;
      canvas.height = height * 2;
      const context = canvas.getContext('2d');
      context.scale(1 / DPI, 1 / DPI);

      onInit({ canvas, context, width, height });
    }
  }, [canvasRef, onInit]);

  return <Canvas style={{ width, height }} ref={canvasRef} />;
};
