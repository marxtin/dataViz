import React from "react";
import { axisTop, select, ScaleLinear } from "d3";

type AxisTopProps = {
  xScale: ScaleLinear<number, number>;
  innerHeight: number;
  tickFormat: (value: number) => string;
  ticks?: number;
};

const AxisTop: React.FC<AxisTopProps> = ({
  xScale,
  innerHeight,
  tickFormat,
  ticks,
}) => {
  const ref = React.useRef<SVGGElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      const xAxis = axisTop(xScale)
        .ticks(ticks)
        .tickFormat(tickFormat as any)
        .tickSize(-innerHeight); // This creates the gridlines by extending the tick size

      select(ref.current).call(xAxis);
    }
  }, [xScale, tickFormat, ticks, innerHeight]);

  return <g ref={ref} />;
};

export default AxisTop;
