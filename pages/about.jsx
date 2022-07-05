import Cookies from "cookies";
import AboutIntro from "../components/AboutIntro";
import AboutStory from "../components/AboutStory";
import Career from "../components/Career";
import CtaAlternative from "../components/CtaAlternative";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Process from "../components/Process";
import Stats from "../components/Stats";
import Team from "../components/Team";

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

function About({ user }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header user={user} />

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
