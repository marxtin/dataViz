import * as d3 from 'd3';

export type PopulationDataByCountryEntry = {
  Country: string;
  Population: number;
  [key: string ]: string | number;
};

export type ScaleBandType = d3.ScaleBand<string>;

export type ScaleLinearType = {
    (value: number): number;
    ticks: () => number[];
  };
  