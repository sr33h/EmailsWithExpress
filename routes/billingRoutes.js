const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middleware/requireLogin");

module.exports = (app) => {
  app.post(
    "/api/stripe",
    requireLogin,

    async (req, res) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 500,
        currency: "inr",
        description: "$5 for 5 ECredits",
        payment_method_data: {
          type: "card",
          card: {
            token: req.body.id,
          },
        },
        automatic_payment_methods: {
          enabled: "true",
          allow_redirects: "never",
        },
      });

      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    }
  );
};
