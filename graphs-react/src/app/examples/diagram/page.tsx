import Head from "next/head";
import { fetchWorldPopulationByCountryData } from "../../../api/fetch";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const NoSSRComponentPopulationDiagram = dynamic(
  () => import("@/components/PopulationDiagram"),
  {
    ssr: false,
  }
);

type PopulationDataByCountryEntry = {
  Country: string;
  Population: number;
  [key: string]: string | number;
};

type DiagramProps = {
  data: PopulationDataByCountryEntry[];
};

const Diagram: React.FC<DiagramProps> = async () => {
  const worldPopulationByCountryData =
    await fetchWorldPopulationByCountryData();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NoSSRComponentPopulationDiagram data={worldPopulationByCountryData} />
      </Suspense>
    </div>
  );
};

export default Diagram;
