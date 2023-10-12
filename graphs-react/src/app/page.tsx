import Head from "next/head";
import { fetchWorldPopulationByCountryData } from "../api/fetch";
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

type HomeProps = {
  data: PopulationDataByCountryEntry[];
};

const Home: React.FC<HomeProps> = async () => {
  const worldPopulationByCountryData =
    await fetchWorldPopulationByCountryData();
  return (
    <div>
      <Head>
        <title>World Population Data Visualization</title>
        <meta
          name="description"
          content="Visualizing world population data using D3.js"
        />
      </Head>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <NoSSRComponentPopulationDiagram
            data={worldPopulationByCountryData}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
