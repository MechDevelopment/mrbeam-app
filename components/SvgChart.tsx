import * as React from 'react';
import Svg, { Path, SvgXml } from 'react-native-svg';
import api from '../assets/ts/api';
import { getLinePath, getPointsPath, getUnitsInfo } from '../assets/ts/units';
import { UnitsState, ViewInfo } from '../assets/types/unit.types';

export const SvgChart = ({ width, height }: ViewInfo) => {
  const [data, setData] = React.useState<UnitsState | null>(null);
  const [line, setLine] = React.useState<string>('');
  const [points, setPoints] = React.useState<string>('');

  async function initData() {
    const data = await api.generate();
    const unitsInfo = getUnitsInfo(data);
    setData({ data, unitsInfo });
  }

  function draw(data: UnitsState, viewInfo: ViewInfo) {
    setLine(getLinePath(data, viewInfo));
    setPoints(getPointsPath(data, viewInfo));
  }

  React.useEffect(() => {
    initData();
  }, []);

  React.useEffect(() => {
    data && draw(data, { width, height });
  }, [data]);

  return (
    <Svg width={width} height={height}>
      <Path d={line} strokeWidth="4" stroke="black" />
      <Path d={points} strokeWidth="2" stroke="black" fill="white" />
    </Svg>
  );
};
