import React from "react";
import Home from "./pages/Home";
import Footer from "./pages/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center dark:bg-[url('/bg-img-dark.jpg')]">
      <header>
        <h1 className="text-5xl font-bold text-center my-8">Readme Studio</h1>
      </header>
      <main className="flex-grow p-4">
        <Home />
      </main>
      <Footer />
    </div>
  );
};
export default App;
