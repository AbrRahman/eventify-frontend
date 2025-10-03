"use client";
import { ReactNode } from "react";
import Header from "@/component/header/Header";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/features/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          {children}
        </PersistGate>
      </Provider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#A3E635",
            color: "#f0f9ff",
            fontSize: "16px",
          },
        }}
      />
    </>
  );
};

export default Providers;
