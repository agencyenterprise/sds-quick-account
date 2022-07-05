import { MongoClient, ServerApiVersion } from "mongodb";
const bcrypt = require("bcrypt");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export default async function handler(req, res) {
  const { name, email, password, passwordConfirmation } = JSON.parse(req.body);

  if (password !== passwordConfirmation) {
    res.status(500).json({
      status: 500,
      message: "Password and Password Confirmation must match.",
    });
    return false;
  }

  if (emailRegex.test(email)) {
    client.connect(async () => {
      const existing = await client
        .db(process.env.DB_NAME)
        .collection("users")
        .findOne({ email });

      if (existing?.email === email) {
        res
          .status(500)
          .json({ status: 500, message: "Email already registered." });
        client.close();
        return false;
      }

      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
      const hash = await bcrypt.hash(password, salt);

      const doc = {
        name,
        email,
        password: hash,
        plan: "free",
      };

      await client.db(process.env.DB_NAME).collection("users").insertOne(doc);

      res.status(200).json({ status: 200, message: "Account created!" });

      client.close();
    });
  } else {
    res.status(500).json({ status: 500, message: "Email is invalid." });
    client.close();
  }
}
