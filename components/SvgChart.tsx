import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SvgChartProps {
  width: number;
  height: number;
}

export const SvgChart = ({ width, height }: SvgChartProps) => {
  return (
    <Svg width={width} height={height}>
      <Path />
    </Svg>
  );
};
