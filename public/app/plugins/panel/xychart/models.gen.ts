import {
  OptionsWithTooltip,
  OptionsWithLegend,
  LineStyle,
  VisibilityMode,
  HideableFieldConfig,
  AxisConfig,
  AxisPlacement,
} from '@grafana/schema';
import { ColorDimensionConfig, TextDimensionConfig, ScaleDimensionConfig } from 'app/features/dimensions';

export enum ScatterLineMode {
  None = 'none',
  Linear = 'linear',
  // Smooth
  // r2, etc
}

export interface ScatterFieldConfig extends HideableFieldConfig, AxisConfig {
  line?: ScatterLineMode;
  lineWidth?: number;
  lineStyle?: LineStyle;
  lineColor?: ColorDimensionConfig;

  point?: VisibilityMode;
  pointSize?: ScaleDimensionConfig;
  pointColor?: ColorDimensionConfig;
  // pointSymbol?: DimensionSupplier<string>;

  label?: VisibilityMode;
  labelValue?: TextDimensionConfig;
}

export const defaultScatterConfig: ScatterFieldConfig = {
  line: ScatterLineMode.None, // no line
  lineWidth: 1,
  lineStyle: {
    fill: 'solid',
  },
  point: VisibilityMode.Auto,
  pointSize: {
    fixed: 5,
    min: 2,
    max: 10,
  },
  axisPlacement: AxisPlacement.Auto,
  label: VisibilityMode.Auto,
};

/** Old config saved with 8.0+ */
export interface XYDimensionConfig {
  frame: number;
  x?: string; // name | first
  exclude?: string[]; // all other numbers except
}

// Runtime processed type send to render
export interface ScatterSeries extends ScatterFieldConfig {
  frameIndex: number;
  xIndex: number;
  yIndex: number;
}

export interface SingleSeries {
  x?: string;
  y?: string;
}

export interface XYChartOptions extends OptionsWithLegend, OptionsWithTooltip {
  dims: XYDimensionConfig; // <<< OLD!!

  mode?: 'single' | 'explicit' | 'xy';

  single?: SingleSeries;
  series?: ScatterSeries[];
}