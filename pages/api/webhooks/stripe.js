import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export default async function handler(req, res) {
  const metadata = req.body.data.object.metadata;
  const status = req.body.data.object.status;

  if (metadata?.email?.length > 0 && status === "complete") {
    await client.connect();
    await client
      .db(process.env.DB_NAME)
      .collection("users")
      .updateOne(
        { email: metadata.email },
        { $set: { plan: metadata.plan_name } }
      );
    res.status(200);
  }
  res.status(200);
}
