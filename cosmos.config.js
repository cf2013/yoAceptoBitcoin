// cosmos.config.js
export const config = {
    endpoint: process.env.COSMOSDB_ENDPOINT,
    key: process.env.COSMOSDB_KEY,
    databaseId: "ToDoList",
    containerId: "items"
  };
  