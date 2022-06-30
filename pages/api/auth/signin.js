import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export default async function handler(req, res) {
  const { email, password } = JSON.parse(req.body);

  if (emailRegex.test(email)) {
    await client.connect();

    const existing = await client
      .db(process.env.DB_NAME)
      .collection("users")
      .findOne({ email });

    if (!existing?.email) {
      res
        .status(500)
        .json({ status: 500, message: "Email or Password is incorrect." });
      client.close();
      return false;
    } else {
      const valid = await bcrypt.compare(password, existing.password);

      if (valid) {
        const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, {
          expiresIn: 86400, // expires in 24h
        });

        delete existing.password;

        res.status(200).json({
          status: 200,
          message: "Logged in!",
          user: existing,
          token,
        });
        return false;
      } else {
        res
          .status(500)
          .json({ status: 500, message: "Email or Password is incorrect." });
        client.close();
        return false;
      }
    }
  } else {
    res.status(500).json({ status: 500, message: "Email is invalid." });
    client.close();
  }
}
