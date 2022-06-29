export default function handler(req, res) {
  res.status(200).json({ auth: false, token: null });
}
