import { loadStripe } from "@stripe/stripe-js";

import React from "react";

const NEXT_PUBLIC_API_KEY =
  "pk_test_51OGs52ALq3vVp5r0n7oSVN4ut8AGbPWc65rlEvmiLA4duBz0AJlclUOXAhI4CsG8O710VtDzI6sNiIoXgbx2mzHD0044QjhCcE";

export async function checkout({ lineItems }) {
  let stripePromise = null;
  const getstripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(NEXT_PUBLIC_API_KEY);
    }
    return stripePromise;
  };
  const stripe = await getstripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/paymentsuccess`,
    cancelUrl: window.location.origin,
  });
}
