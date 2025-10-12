const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://ifrairshadmalik_db_user:oEVYus0IFWKkStdK@swiftlift-cluster.ipcmpwu.mongodb.net/swiftlift_dev?retryWrites=true&w=majority&appName=swiftlift-cluster";


const client = new MongoClient(uri, {
  serverApi: { 
    version: ServerApiVersion.v1, 
    strict: true, 
    deprecationErrors: true 
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");
  } catch (e) {
    console.error("❌ Connection failed:", e);
  } finally {
    await client.close();
  }
}

run();
