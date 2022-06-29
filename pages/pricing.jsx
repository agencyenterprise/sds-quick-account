import Cta from "../components/Cta";
import Faqs from "../components/Faqs";
import FeaturesTable from "../components/FeaturesTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PricingTables from "../components/PricingTables";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

function Pricing() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <PricingTables />
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
