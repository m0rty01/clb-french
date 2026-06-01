// Helper script to generate Stripe webhook test signatures
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_dummy');

// Read arguments: payload and secret
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node gen_stripe_sig.js <payload_json> <secret>');
  process.exit(1);
}

const payload = args[0];
const secret = args[1];

try {
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payload,
    secret: secret
  });
  console.log(header);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
