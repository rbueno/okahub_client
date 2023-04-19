import Stripe from 'stripe';

const stripe = new Stripe('sk_test_cr2Rk8YQimJzRtBlVpUJ6ynu');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
    //   const session = await stripe.checkout.sessions.create({
    //     mode: 'payment',
    //     payment_method_types: ['card'],
    //     line_items: req?.body?.items ?? [],
    //     success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${req.headers.origin}/cart`,
    //   });


      const session = await stripe.checkout.sessions.create({
        line_items: [
          {price: 'price_1MyMSqAJW2XjEkve2vi7GMhY', quantity: 1},
        ],
        mode: 'subscription',
        success_url: 'https://okahub.com',
        cancel_url: 'https://example.com',
      });

      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}