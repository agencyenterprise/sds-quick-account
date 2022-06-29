import AboutIntro from "../components/AboutIntro";
import AboutStory from "../components/AboutStory";
import Career from "../components/Career";
import CtaAlternative from "../components/CtaAlternative";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Process from "../components/Process";
import Stats from "../components/Stats";
import Team from "../components/Team";

function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <AboutIntro />
        <AboutStory />
        <Stats />
        <Team />
        <Career />
        <Process />
        <CtaAlternative />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default About;
