import Canvas, { Path2D } from 'react-native-canvas';
import { CanvasRenderingContext2D } from 'react-native-canvas';

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

    path2D.moveTo(pos[0], pos[1]);
    for (const [x, y] of path) {
      const xCoord = pos[0] + x * scale[0];
      const yCoord = pos[1] + y * scale[1];
      path2D.lineTo(xCoord, yCoord);
    }

    this.elements.push({ renderMethod: renderPath, options, path2D });
  }

  public async pressTrigger(e: any) {
    for (const element of this.elements) {
      if (element.options.onClick) {
        const p = await (this.ctx as any).isPointInPath(
          element.path2D,
          e[0],
          e[1]
        );
        const s = await (this.ctx as any).isPointInStroke(
          element.path2D,
          e[0],
          e[1]
        );

        if (p || s) {
          console.log(p, s, p || s);
          element.options.onClick(element.path2D);
        }
      }
    }
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
