import { Unit, UnitsInfo, UnitsState, ViewInfo } from '../types/unit.types';
import { flat } from './utils';

export function getUnitsInfo(data: Unit[]): UnitsInfo {
  const setOfPoints = new Set(flat(data.map((el) => el.x)));
  const points = Array.from(setOfPoints).sort((a, b) => a - b);

  let [x, y] = [points[0], points[points.length - 1]];
  let [length, center] = [y - x, (y + x) / 2];

  return { x, y, length, center, points };
}

export function getLinePath(data: UnitsState, viewInfo: ViewInfo) {
  let line = '';
  data.unitsInfo.points.reduce((a: number, b: number) => {
    line += addLine(
      [getX(a, viewInfo, data.unitsInfo), viewInfo.height / 2],
      [getX(b, viewInfo, data.unitsInfo), viewInfo.height / 2]
    );
    return b;
  });
  return line;
}

export function getPointsPath(data: UnitsState, viewInfo: ViewInfo) {
  let path = '';
  data.unitsInfo.points.forEach((x: number) => {
    path += addCircle(
      [getX(x, viewInfo, data.unitsInfo), viewInfo.height / 2],
      3
    );
  });
  return path;
}

function getX(x: number, viewInfo: ViewInfo, unitsInfo: UnitsInfo) {
  const padding = 20;
  const scale = (viewInfo.width - 2 * padding) / unitsInfo.length;
  return (x - unitsInfo.x) * scale + padding;
}

// SVG
function addLine(a: [number, number], b: [number, number]) {
  return `M ${a[0]}, ${a[1]} L ${b[0]}, ${b[1]} `;
}

function addCircle(coords: [number, number], radius: number) {
  return `
    M ${coords[0]}, ${coords[1]}
    m ${-radius}, 0
    a ${radius},${radius} 0 1,0 ${radius * 2}, 0
    a ${radius},${radius} 0 1,0 ${-radius * 2}, 0`;
}
