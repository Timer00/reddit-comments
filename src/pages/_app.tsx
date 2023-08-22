import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { createContext } from "react";
import { UserProvider } from "~/hooks/useUser";

export const UserContext = createContext(null);

const MyApp: AppType = ({ Component, pageProps }) =>
  // The provider is in the app root in case the username would be needed in a header for example
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>

export default MyApp;
