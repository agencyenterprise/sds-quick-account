import jwt from "jsonwebtoken";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export default async function handler(req, res) {
  let decoded = { id: "" };

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    res.status(500).json({ status: 500, message: "JWT expired." });
    return false;
  }

  await client.connect();

  const existing = await client
    .db(process.env.DB_NAME)
    .collection("users")
    .findOne({ _id: new ObjectId(decoded.id) });

  if (!existing?.email) {
    res.status(500).json({ status: 500, message: "User not found." });
    client.close();
    return false;
  } else {
    delete existing.password;

    res.status(200).json({
      status: 200,
      user: existing,
    });
    return false;
  }
}
