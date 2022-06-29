const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  const id = await validateLogin(req.body.email, req.body.password);

  if (id) {
    const token = jwt.sign({ id }, process.env.PASSWORD_SECRET, {
      expiresIn: 300, // expires in 5min
    });

    return res.json({ auth: true, token: token });
  }

  res
    .status(500)
    .json({ message: "Login Failed: Your user ID or password is incorrect" });
}

const validateLogin = async (email, password) => {
  return 4;
};
