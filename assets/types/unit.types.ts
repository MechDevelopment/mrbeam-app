export type UnitType =
  | 'point'
  | 'force'
  | 'moment'
  | 'distload'
  | 'fixed'
  | 'simple'
  | 'hinge'
  | 'material';

export interface Unit {
  readonly id: string;
  type: UnitType;
  x: number | number[];
  value?: number | number[];
}

export interface UnitsInfo {
  x: number;
  y: number;
  length: number;
  center: number;
  points: number[];
}

export interface ViewInfo {
  width: number;
  height: number;
}

export interface UnitsState {
  data: Unit[];
  unitsInfo: UnitsInfo;
}
