import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { StoreProvider } from "@/context/storeContext";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
