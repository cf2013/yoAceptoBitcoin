import { CosmosClient } from "@azure/cosmos";
import { config } from "../../cosmos.config.js";

const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

export async function readItems() {
  const querySpec = {
    query: "SELECT * from c"
  };

  const { resources: items } = await container.items.query(querySpec).fetchAll();
  return items;
}