import "../styles/global.css";

import type { AppProps } from "next/app";
import AppLayout from "layouts/AppLayout";
import { NextLink } from "next-ui-wrapper";
import { navBarLinks } from "data";
import { Banner } from "ui";

const links = navBarLinks.map((link) => ({ ...link, Component: NextLink }));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Banner label="Next.js host" variant="black" />

      <AppLayout links={links}>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
