import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { ThemeProvider } from "@material-tailwind/react";
import LoadingState from "./common/LoadingState/LoadingState";
import "./index.css";

const token = localStorage.getItem?.("token");

const client = new ApolloClient({
  uri:
    import.meta.env.MODE === "production"
      ? "https://coursea-production.up.railway.app/graphql"
      : "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingState />}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Suspense>
  </React.StrictMode>
);
