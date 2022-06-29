import Footer from "../components/Footer";
import Header from "../components/Header";
import PostSingle from "../components/PostSingle";

function BlogPost() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <PostSingle />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default BlogPost;
