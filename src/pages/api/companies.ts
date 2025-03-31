import type { APIRoute } from 'astro';
import { CosmosClient } from '@azure/cosmos';

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['companyName', 'location', 'description', 'website', 'telephone'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({
        error: `Missing required fields: ${missingFields.join(', ')}`
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Initialize CosmosDB client only when needed
    const endpoint = import.meta.env.COSMOS_ENDPOINT;
    const key = import.meta.env.COSMOS_KEY;
    const databaseId = import.meta.env.COSMOS_DATABASE;
    const containerId = import.meta.env.COSMOS_CONTAINER;

    if (!endpoint || !key || !databaseId || !containerId) {
      throw new Error('Missing CosmosDB configuration');
    }

    const client = new CosmosClient({ endpoint, key });

    // Create a new company document
    const company = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending' // You can use this to moderate submissions
    };

    // Get the database and container
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Create the item in CosmosDB
    await container.items.create(company);

    return new Response(JSON.stringify({
      message: 'Company registered successfully',
      id: company.id
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error saving company:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Error saving company data'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 