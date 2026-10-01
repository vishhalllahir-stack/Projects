import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="app-layout">

      <NavBar />

      <main className="app-main">
        {children}
      </main>

      <Footer />

    </div>
  );
}

export default Layout;