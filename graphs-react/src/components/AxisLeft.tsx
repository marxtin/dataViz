import React from "react";
import useHoverStore from "@/lib/useHoverStore";
import { ScaleBand, select, axisLeft } from "d3";

type AxisBottomProps = {
  yScale: ScaleBand<string>;
};

const AxisBottom: React.FC<AxisBottomProps> = ({ yScale }) => {
  const ref = React.useRef<SVGGElement | null>(null);
  const { hoveredItem } = useHoverStore();

  React.useEffect(() => {
    if (ref.current) {
      const yAxis = axisLeft(yScale);
      select(ref.current).call(yAxis);

      // After D3 has generated the axis, apply the highlight class
      select(ref.current)
        .selectAll(".tick text")
        .classed("highlighted", (d) => d === hoveredItem);
    }
  }, [yScale, hoveredItem]);

  return <g ref={ref} />;
};

export default AxisBottom;
