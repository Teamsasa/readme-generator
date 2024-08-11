import React from "react";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-cover bg-center dark:bg-[url('/bg-img-dark.jpg')]">
        <Helmet>
          <title>Readme Studio</title>
          <meta
            name="description"
            content="A simple and customizable GitHub Profile generator."
          />
          <meta property="og:title" content="Readme Studio" />
          <meta
            property="og:description"
            content="A simple and customizable GitHub Profile generator."
          />
          <meta property="og:image" content="/og-img.jpg" />
          <link rel="icon" href="/og-img.jpg" />
        </Helmet>
        <header>
          <h1 className="text-5xl font-bold text-center my-8">Readme Studio</h1>
        </header>
        <main className="flex-grow p-4">
          <Home />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;
