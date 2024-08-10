import React from "react";
import Home from "./pages/Home";
import Footer from "./pages/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
