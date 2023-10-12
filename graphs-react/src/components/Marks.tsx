import React from "react";
import { PopulationDataByCountryEntry, ScaleBandType, ScaleLinearType } from "@/types";
import useHoverStore from "@/lib/useHoverStore";
import classNames from "classnames";

type MarksProps = {
  data: PopulationDataByCountryEntry[];
  xScale: ScaleLinearType;
  yScale: ScaleBandType;
  xVal: (d: PopulationDataByCountryEntry) => number;
  yVal: (d: PopulationDataByCountryEntry) => string;
  toolTipFormat: (value: number) => string;
};

const Marks: React.FC<MarksProps> = ({
  data,
  xScale,
  yScale,
  xVal,
  yVal,
  toolTipFormat,
}) => {
  const { hoveredItem, setHoveredItem } = useHoverStore();

  return data.map((d) => (
    <g key={yVal(d)}>
      <rect
        x={0}
        y={yScale(yVal(d))}
        width={xScale(xVal(d))}
        height={yScale.bandwidth()}
        className={classNames("mark", {
          highlighted: yVal(d) === hoveredItem,
        })}
        onMouseEnter={() => setHoveredItem(yVal(d))}
        onMouseLeave={() => setHoveredItem(null)}
      />
      <title>
        {toolTipFormat(xVal(d))}: {yVal(d)}
      </title>
    </g>
  ));
};

export default Marks;
