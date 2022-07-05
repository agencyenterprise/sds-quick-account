import Cookies from "cookies";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";
import TutorialsList from "../components/TutorialsList";

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

function Tutorials({ user }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header user={user} />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <TutorialsList />
        <Newsletter />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Tutorials;
