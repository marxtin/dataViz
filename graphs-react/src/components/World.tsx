"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import worldData from "@/lib/countries-110m.json";
import { WorldDataEntry } from "@/app/page";
import { GeoJsonProperties } from "geojson";

type WorldStyleProps = {};

type WorldProps = {
  data: WorldDataEntry[];
  style?: WorldStyleProps[];
};

const WorldMap: React.FC<WorldProps> = (data) => {
  const ref = useRef<SVGSVGElement>(null);

  const landColor = "#09A573";
  const landStroke = "#FCF5E9";

  const rotationSpeed = 0.05; // Adjust as needed for desired rotation speed

  useEffect(() => {
    const svg = d3.select(ref.current);

    const geoJsonData = topojson.feature(
      worldData as any,
      worldData.objects.countries as any
    );

    const projection = d3.geoOrthographic().fitSize([800, 600], geoJsonData);
    const pathGen = d3.geoPath().projection(projection);

    const paths = svg
      .selectAll("path")
      .data((geoJsonData as any).features)
      .join("path")
      .attr("fill", landColor)
      .attr("stroke", landStroke)
      .attr("stroke-width", 1);

    paths
      .attr("d", (d: any) => pathGen(d) as any)
      .on("mouseenter", function (event, d: any) {
        d3.select(this).attr("fill", "blue");
        updateCountryDetailView(d);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("fill", landColor);
      });

    let start: { x: number; y: number } | null = null;
    let rotation: [number, number, number] | null = null;

    const drag = d3
      .drag()
      .on("start", function (event) {
        start = { x: event.x, y: event.y };
        rotation = projection.rotate();
      })
      .on("drag", function (event) {
        if (start && rotation) {
          const dx = event.x - start.x;
          const dy = event.y - start.y;
          const dragRotationSpeed = 0.2; // Reduced rotation speed for smoother drag
          const newRotation: [number, number, number] = [
            rotation[0] + dx * dragRotationSpeed,
            rotation[1] - dy * dragRotationSpeed,
            rotation[2],
          ];

          if (
            Math.abs(newRotation[0] - rotation[0]) > 0.5 ||
            Math.abs(newRotation[1] - rotation[1]) > 0.5
          ) {
            projection.rotate(newRotation);
            paths.attr("d", (d: any) => pathGen(d));
          }
        }
      });

    paths.call(drag as any);

    // Continuous rotation
    const rotateGlobe = () => {
      const currentRotation = projection.rotate();
      projection.rotate([
        currentRotation[0] + rotationSpeed,
        currentRotation[1],
        currentRotation[2],
      ]);
      paths.attr("d", (d: any) => pathGen(d));
    };

    const timer = d3.timer(rotateGlobe);

    return () => {
      timer.stop();
    };
  }, []);

  function updateCountryDetailView(
    countryData:
      | d3.GeoGeometryObjects
      | d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
      | d3.ExtendedFeatureCollection<
          d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
        >
      | d3.ExtendedGeometryCollection<d3.GeoGeometryObjects>
  ) {
    const detailContainer = d3.select("#countryDetail");
    detailContainer.selectAll("*").remove(); // Clear previous detail view

    const detailSvg = detailContainer
      .append("svg")
      .attr("width", "400")
      .attr("height", "600");

    const projection = d3.geoMercator().fitSize([400, 400], countryData);
    const pathGen = d3.geoPath().projection(projection);
    
    detailSvg
      .append("path")
      .datum(countryData)
      .attr("d", pathGen)
      .attr("fill", landColor)
      .attr("stroke", landStroke)
      .attr("stroke-width", 1);

    // If you want to add the country name or other information, do it here
    detailSvg
      .append("text")
      .attr("x", 200)
      .attr("y", 500)
      .attr("text-anchor", "middle")
      .text((countryData as any).properties.name);
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <svg ref={ref} width={800} height={600}></svg>
      </div>
      <div id="countryDetail" style={{ width: "400px", height: "600px" }}></div>
    </div>
  );
};

export default WorldMap;
