import AOS from "aos";
import { useEffect } from "react";
import Sticky from "sticky-js";
import "../styles/style.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    // eslint-disable-next-line no-unused-vars
    const sticky = new Sticky("[data-sticky]");
  });

  return <Component {...pageProps} />;
}

export default MyApp;
