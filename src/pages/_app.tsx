import { type AppType } from "next/dist/shared/lib/utils";
import localFont from "next/font/local";

import "~/styles/globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Bold.ttf",
    },
  ],
  variable: "--font-montserratBold",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main lang="en" className={`${montserrat.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
