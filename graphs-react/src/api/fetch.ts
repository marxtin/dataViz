import * as d3 from "d3";
import { PopulationDataByCountryEntry } from "@/types"; // Adjust the path if necessary

export const fetchWorldPopulationByCountryData = async (): Promise<
  PopulationDataByCountryEntry[]
> => {
  const csvUrl =
    "https://gist.githubusercontent.com/crew-guy/e1ae0b5db6ace5eda68bc8fb9e903576/raw/UN%2520World%2520Population%2520Dataset%2520-%2520Sheet1.csv";

  // Using d3.csv()
  const row = (d: { [key: string]: string }): PopulationDataByCountryEntry => {
    return {
      Country: d.Country, // Ensure the Country property is included
      Population: +d["2020"],
      ...d,
    };
  };

  const fullData: PopulationDataByCountryEntry[] = await d3.csv(csvUrl, row);
  console.log(fullData);
  return fullData.slice(0, 50);
};
