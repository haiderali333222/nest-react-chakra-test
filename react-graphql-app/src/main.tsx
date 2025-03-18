import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "./components/ui/provider";
import client from "./services/apollo-client";
import App from "./App";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider>
        <Toaster />
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
