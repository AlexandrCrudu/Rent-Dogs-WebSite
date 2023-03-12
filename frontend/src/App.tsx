import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import JWTContext from "./JWTContext";
import DogDetails from "./components/DogDetails";
import Header from "./components/Header";
import CardsSection from "./components/CardsSection";
import LoginPage from "./components/LoginPage";
import Footer from "./components/footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const jwt = useState("");

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
            <Route path="/dog-details/:id" element={<DogDetails />}></Route>
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
