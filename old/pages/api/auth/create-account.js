const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS;

export default function handler(req, res) {
  const { password, email, name } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log("generated hash: ", hash);
  });

  res.status(200).json({ response: "account created" });
}
