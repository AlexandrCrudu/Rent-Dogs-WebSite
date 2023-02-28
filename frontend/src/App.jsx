import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Mission from "./components/Mission";
import CardsSection from "./components/CardsSection";

const App = () => {
  return (
    <>
      <Header />
      <Mission />
      <CardsSection />
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
