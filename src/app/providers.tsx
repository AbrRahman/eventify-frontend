"use client";
import { ReactNode } from "react";
import Header from "@/component/header/Header";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/features/store";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default Providers;
