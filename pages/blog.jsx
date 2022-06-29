import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Blog() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <BlogList />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Blog;
