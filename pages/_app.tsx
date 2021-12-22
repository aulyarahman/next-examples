import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Login from "./login";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SidebarContents = dynamic(() => import("../components/Sidebar"), {
  ssr: false,
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <span>Loading...</span>;

  if (user) {
    return (
      <div suppressHydrationWarning>
        <ChakraProvider resetCSS>
          <SidebarContents>
            {typeof window === "undefined" ? null : (
              <Component {...pageProps} />
            )}
          </SidebarContents>
        </ChakraProvider>
      </div>
    );
  }

  return (
    <ChakraProvider resetCSS>
      <Login />
    </ChakraProvider>
  );
}
export default MyApp;
