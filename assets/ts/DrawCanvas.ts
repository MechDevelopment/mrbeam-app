import Canvas, { Path2D } from 'react-native-canvas';
import { CanvasRenderingContext2D } from 'react-native-canvas';
import { Point } from '../types/canvas';

interface Element {
  renderMethod: string;
  [key: string]: any;
}

export class DrawCanvas {
  private elements: any[] = [];
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: Canvas | null = null;

  init(canvas: Canvas, context: CanvasRenderingContext2D) {
    this.elements = [];
    this.canvas = canvas;
    this.ctx = context;
  }

  public path(options: any) {
    if (!this.canvas) return;
    const { pos, path, scale } = options;
    const path2D = new Path2D(this.canvas);

    // path2D.moveTo(pos[0], pos[1]);
    for (const [x, y] of path) {
      const xCoord = pos[0] + x * scale[0];
      const yCoord = pos[1] + y * scale[1];
      path2D.lineTo(xCoord, yCoord);
    }
    path2D.closePath();

    this.elements.push({ renderMethod: renderPath, options, path2D });
  }

  public pressTrigger(point: Point) {
    this.elements.forEach((el: Element) => {
      if (el.options.onClick) {
        (this.ctx as any)
          .isPointInPath(el.path2D, point[0], point[1])
          .then((status: 'false' | 'true') => {
            if (status === 'true') {
              el.options.onClick();
            }
          });
      }
    });
  }

  public render() {
    this.elements.forEach((element: any) => {
      element.renderMethod(this.ctx, element.options, element.path2D);
    });
  }
}

function renderPath(ctx: CanvasRenderingContext2D, options: any, path2D: any) {
  const { color, lineWidth } = options;

  ctx.strokeStyle = color || 'black';
  ctx.lineWidth = lineWidth || 1;
  ctx.stroke(path2D);
}
