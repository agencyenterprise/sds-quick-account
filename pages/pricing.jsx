import { loadStripe } from "@stripe/stripe-js";
import Cookies from "cookies";
import { useEffect } from "react";
import Cta from "../components/Cta";
import Faqs from "../components/Faqs";
import FeaturesTable from "../components/FeaturesTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PricingTables from "../components/PricingTables";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);

  const token = cookies.get("token");

  const baseUrl = process.env.BASE_URL;

  const userRes = await fetch(`${baseUrl}/api/auth/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await userRes.json();

  // // does not allow access to page if not logged in
  if (!response.user?.email) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: response.user },
  };
}

function Pricing({ user }) {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header user={user} />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <PricingTables user={user} />
        <FeaturesTable />
        <TestimonialsCarousel />
        <Faqs />
        <Cta />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Pricing;
