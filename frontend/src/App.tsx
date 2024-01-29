import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { StoreProvider } from "easy-peasy";
import AppRoutes from "./routes";
import { store } from "./store";

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <AppRoutes />
      </StoreProvider>
    </>
  );
}

export default App;
