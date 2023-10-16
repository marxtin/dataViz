import Head from "next/head";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { fetchFromMongoDb } from "@/api/fetchMongo";

const NoSSRComponentWorldMap = dynamic(
  () => import("@/components/World"),
  {
    ssr: false,
  }
);

export type EarthquakeDataEntry = {
  time: Date;
  latitude: number;
  longitude: number;
  mag: number;
};

type HomeProps = {
  data: EarthquakeDataEntry[];
};

const Home: React.FC<HomeProps> = async () => {
  const earthQuakes = await fetchFromMongoDb();

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
          <NoSSRComponentWorldMap data={earthQuakes} />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
