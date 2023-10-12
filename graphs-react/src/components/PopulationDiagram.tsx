'use client';

import React, { useState, useEffect, useRef } from "react";
import AxisTop from "./AxisTop";
import AxisBottom from "./AxisLeft";
import Marks from "./Marks";
import { PopulationDataByCountryEntry } from "@/types";
import { scaleLinear, scaleBand, max, format } from "d3";

export interface PopulationDiagramProps {
  data: PopulationDataByCountryEntry[];
}

const PopulationDiagram: React.FC<PopulationDiagramProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, []);

  const { width, height } = containerSize;

  const margin = { top: 40, left: 300, right: 40, bottom: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xVal = (d: PopulationDataByCountryEntry): number => d.Population * 1000;
  const yVal = (d: PopulationDataByCountryEntry): string => d.Country;

  const xScale = scaleLinear()
    .domain([0, max(data, xVal) as number])
    .range([0, innerWidth]);

  const yScale = scaleBand<string>()
    .domain(data.map(yVal))
    .range([0, innerHeight])
    .padding(0.2);

  const xAxisLabelOffset = 80;
  const siFormat = format(".2s");
  const tickFormat = (tickValue: number): string =>
    siFormat(tickValue).replace("G", "B");

  const numberOfTicks = Math.ceil((max(data, xVal) as number) / 100000000);

  return (
    <div className="diagram-container" ref={containerRef}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisTop
            xScale={xScale}
            tickFormat={tickFormat}
            innerHeight={innerHeight}
            ticks={numberOfTicks}
          />
          <AxisBottom yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="center"
            y={innerHeight + xAxisLabelOffset}
          >
            Population
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xVal={xVal}
            yVal={yVal}
            toolTipFormat={tickFormat}
          />
        </g>
      </svg>
    </div>
  );
};

export default PopulationDiagram;

