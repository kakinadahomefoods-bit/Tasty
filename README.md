# Tasty Treasures — Full-stack starter

Reference-matched storefront (adapted from client screenshot), MongoDB Atlas product/order storage, Cloudinary authenticated admin image uploads, Razorpay **test** checkout, and **mock** Delhivery shipping. Admin panel: `/admin.html`.

## Run locally

1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env`. Set `MONGODB_URI`, `JWT_SECRET` (32+ random characters), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and Razorpay **test** keys. Never commit `.env`.
3. Run `npm run seed` to insert the 10 screenshot catalog products (without overwriting existing edits).
4. Run `npm run dev` and open `http://localhost:3000` or `/admin.html`.
5. For Cloudinary uploads, configure the three `CLOUDINARY_*` variables. Upload signatures are generated server-side after admin authentication.
6. For Razorpay webhooks, register `https://YOUR-DOMAIN/api/webhooks/razorpay` with the webhook secret and `payment.captured` / `payment.failed` events. Checkout also verifies signature and captured payment status.

## Status and limitations

- Shipping is **mock only**: fixed ₹60 illustrative charge, 3–7 day illustrative estimate, generated `MOCK...` tracking IDs. It does not book Delhivery pickups or verify real pincode serviceability. Live mode intentionally returns an error until a verified integration is implemented.
- Razorpay accepts only `rzp_test_` keys. No live money movement is intended.
- Customer checkout uses a guest form; there is no customer account system yet.
- Product stock is validated at checkout but not reserved/decremented atomically; production launch requires stock reservation, idempotent fulfillment, cancellation/refund handling, and webhook reconciliation.
- Admin uses an environment-configured login with an HTTP-only session cookie. For production add audit logs, CSRF protection, stronger admin identity/MFA, and request monitoring.
- Storefront retains local screenshot-derived images. Replace with licensed original client assets for best fidelity.
- The original first screenshot is a visual reference, not original source assets; pixel-perfect fidelity cannot be guaranteed from screenshots alone.
- This is an Express server, **not** a Vercel-ready serverless deployment. Deploy to a Node.js host or adapt the API to Vercel functions before deploying there.

## Security

Never expose MongoDB URI, Razorpay secret, Cloudinary secret, admin password, or webhook secret in client JavaScript. Only the public Razorpay key and Cloudinary cloud name/API key appear in authenticated upload setup. Payment totals are calculated from MongoDB prices, never from browser prices.


## No-setup design preview
Open `public/preview.html` in a browser to review the storefront using the screenshot-derived sample catalog. No MongoDB, Cloudinary, Razorpay, or Delhivery credentials are required. Cart works locally; checkout is a demo alert and no payment or shipment is created. For the full application run `npm install` and `npm run dev`.


## Premium design update
The homepage and preview now use the approved green/cream/burgundy/gold palette, premium hero/category crops, benefit strip, trust elements, promotional banners, and verified-claim placeholders. `public/design-reference.html` displays the approved full-length mockup for pixel-level comparison. The working site is `public/index.html`; `public/preview.html` is standalone design mode. Review/replace low-resolution cropped imagery with original licensed assets before launch.


## Multipage design update
Customer pages: `/`, `/shop.html`, `/about.html` (includes process and FAQ), `/contact.html`, `/shipping.html`. Hero art generated for the website at `public/assets/hero-generated.png`. Existing Cloudinary, MongoDB, Razorpay test and mock shipping server code retained. Trust claims and product photography should be verified against client source material before production.


## Updated ordering flow
The WhatsApp ordering CTA was removed. Customers shop → cart → address and pincode → mock shipping quote → Razorpay TEST checkout → server-side signature and captured-payment verification → order confirmation. The floating WhatsApp button remains for support only. No live money or Delhivery shipments are processed.

Generated branded hero artwork: `public/assets/hero-branded.png`; promotional banners: `orange-banner.jpg` and `moringa-banner.jpg`. The images are illustrative artwork, not verified product packshots.

**Production prerequisites:** Razorpay live keys and webhook secret, MongoDB Atlas, Cloudinary, actual Delhivery API, HTTPS deployment, robust stock reservation, retry/idempotency, reconciliation, refunds, and shipping fees.


## Checkout policy (updated)
Customers buy through cart → address → Razorpay test checkout → server-verified payment → order confirmation. WhatsApp is for customer support only. The mock Delhivery charge is ₹60. Do not enable live payments until payment-webhook idempotency, atomic inventory reservation/deduction, and end-to-end testing are completed.
