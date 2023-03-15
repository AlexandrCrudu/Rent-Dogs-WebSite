import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import JWTContext from "./JWTContext";
import DogDetails from "./components/DogDetails";
import Header from "./components/Header";
import CardsSection from "./components/CardsSection";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import Checkout from "./components/Checkout";
import PaymentConfirmation from "./components/PaymentConfirmation";
import { DogPropsType } from "./types/DogTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [dog, setDog] = useState({} as DogPropsType);

  const dogDispatch = (selectedDog: DogPropsType) => {
    setDog(selectedDog);
  };

  const jwt = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      jwt[1](token);
    }
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <JWTContext.Provider value={jwt}>
          <Header />
          <Routes>
            <Route path="/" element={<CardsSection />}></Route>
            <Route path="/Login" element={<LoginPage isLogin={true} />}></Route>
            <Route
              path="/Signup"
              element={<LoginPage isLogin={false} />}
            ></Route>
            <Route
              path="/dog-details/:id"
              element={<DogDetails setDog={dogDispatch} />}
            ></Route>
            <Route
              path="/pre-checkout/:id"
              element={<Checkout dog={dog} />}
            ></Route>
            <Route
              path="/payment-confirmation"
              element={<PaymentConfirmation />}
            ></Route>
            <Route path="/:dogId/reviews" element={<Reviews />}></Route>
          </Routes>
          <Footer />
        </JWTContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
