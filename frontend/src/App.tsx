import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import UserContext from "./components/Contexts/UserContext";
import TokenContext from "./components/Contexts/TokenContext";
import getMe from "../fetch-functions.js/users/getMe";
import DogDetails from "./components/DogDetails";
import Header from "./components/Header";
import CardsSection from "./components/CardsSection";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";
import Checkout from "./components/Checkout";
import PaymentConfirmation from "./components/PaymentConfirmation";
import { DogPropsType } from "./types/DogTypes";
import ReviewConfirmation from "./components/ReviewConfirmation";
import WriteReview from "./components/WriteReview";
import About from "./components/About";
import MyOrders from "./components/MyOrders";
import { UserType } from "./types/UserTypes";
import ErrorMessage from "./components/ErrorMessage";

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
  const [user, setUser] = useState(null as UserType | null);
  const [token, setToken] = useState(null as string | null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await getMe();
        setUser(res.data.user);
        setToken(localStorage.getItem("token"));
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    }

    fetchMe();
  }, []);

  const dogDispatch = (selectedDog: DogPropsType) => {
    setDog(selectedDog);
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
          <TokenContext.Provider value={[token, setToken]}>
            <Header />
            <Routes>
              <Route path="/" element={<CardsSection />} />
              <Route path="/Login" element={<LoginPage isLogin={true} />} />
              <Route path="/Signup" element={<LoginPage isLogin={false} />} />
              <Route
                path="/dog-details/:id"
                element={<DogDetails setDog={dogDispatch} />}
              />
              <Route
                path="/pre-checkout/:id"
                element={<Checkout dog={dog} />}
              />
              <Route
                path="/payment-confirmation"
                element={<PaymentConfirmation />}
              />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/:dogId/reviews" element={<Reviews />} />
              <Route path="/:dogId/write-review" element={<WriteReview />} />
              <Route
                path="/review-confirmation"
                element={<ReviewConfirmation />}
              />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </TokenContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(
  <ErrorBoundary fallback={<ErrorMessage />}>
    <App />
  </ErrorBoundary>
);
