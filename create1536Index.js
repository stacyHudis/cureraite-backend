const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

async function createIndex() {
  try {
    const indexName = "cureraite-products";
    const dimension = 1536;

    const existing = await pinecone.listIndexes();
    const indexNames = existing.indexes ? existing.indexes.map(idx => idx.name) : existing;

    if (indexNames.includes(indexName)) {
      console.log(`❌ Index "${indexName}" already exists.`);
      return;
    }

    await pinecone.createIndex({
      name: indexName,
      dimension,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1"
        }
      }
    });

    console.log(`✅ Index "${indexName}" created with dimension ${dimension}`);
  } catch (err) {
    console.error("❌ Failed to create index:", err);
  }
}

createIndex();
