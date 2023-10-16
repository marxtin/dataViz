import React from "react";
import { ScaleBandType, ScaleLinearType } from "@/types";
import useHoverStore from "@/lib/useHoverStore";
import classNames from "classnames";
import { useModalStore } from "@/lib/useModal";

type BarsProps<T> = {
  data: T[];
  xScale: ScaleLinearType;
  yScale: ScaleBandType;
  xVal: (d: T) => number;
  yVal: (d: T) => string;
};

const Bars = <T,>({
  data,
  xScale,
  yScale,
  xVal,
  yVal,
}: BarsProps<T>): JSX.Element => {
  const { openModal, closeModal } = useModalStore();
  const { hoveredItem, setHoveredItem } = useHoverStore();

  return (
    <>
      {data.map((d) => {
        const value = xVal(d);
        const width = Math.abs(xScale(value));
        const xPosition = value < 0 ? xScale(0) - width : xScale(0);

        return (
          <g key={yVal(d)}>
            <rect
              x={xPosition}
              y={yScale(yVal(d))}
              width={width}
              height={yScale.bandwidth()}
              className={classNames("mark", {
                highlighted: yVal(d) === hoveredItem,
              })}
              onMouseEnter={() => {
                setHoveredItem(yVal(d));
                openModal(d);
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                closeModal();
              }}
            />
          </g>
        );
      })}
    </>
  );
};

export default Bars;
