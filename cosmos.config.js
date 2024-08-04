// cosmos.config.js
// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    endpoint: process.env.COSMOSDB_ENDPOINT,
    key: process.env.COSMOSDB_KEY,
    databaseId: "YoAceptoBitcoinCompanies",
    containerId: "Companies"
  };
console.log("CosmosDB Config:", config);
