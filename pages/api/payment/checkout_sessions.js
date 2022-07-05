import { formatAmountForStripe } from "../../../utils/stripe-helpers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const CURRENCY = "usd";

export default async function handler(req, res) {
  const { email, product_name, amount, plan_name } = req.body;

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            name: product_name,
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        metadata: {
          email,
          product_name,
          amount,
          plan_name,
        },
        mode: "payment",
        success_url: `${req.headers.origin}/pricing?success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
