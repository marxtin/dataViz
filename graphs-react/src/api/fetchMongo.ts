// fetchFromMongoDb.ts

import { MongoClient } from "mongodb";

const mongoURI = process.env.CONNECTION_STRING || "";
const dbName = process.env.DB_NAME || "";
const collectionName = process.env.COLLECTION_NAME || "";

export const client = new MongoClient(mongoURI);

export const fetchFromMongoDb = async () => {
  if (!client.connect()) await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Fetch the 1000 newest earthquakes
  const earthquakes = await collection
    .find()
    .sort({ date: -1 })
    .limit(1000)
    .toArray();

  // Convert the raw data to the EarthquakeDataEntry format
  return earthquakes.map((eq) => ({
    time: new Date(eq.time),
    latitude: eq.latitude,
    longitude: eq.longitude,
    mag: eq.mag,
  }));
};
