import Head from "next/head";
import { fetchWorldPopulationByCountryData } from "../api/fetch";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { fetchFromMongoDb } from "@/api/fetchMongo";

type PopulationDataByCountryEntry = {
  Country: string;
  Population: number;
  [key: string]: string | number;
};

export type WorldDataEntry = {
  time: Date;
  latitude: number;
  longitude: number;
  mag: number;
};

type HomeProps = {
  data: PopulationDataByCountryEntry[] | WorldDataEntry[];
};

const Home: React.FC<HomeProps> = async () => {
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
          <p>Hi</p>
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
