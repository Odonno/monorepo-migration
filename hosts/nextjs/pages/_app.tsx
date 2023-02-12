import type { AppProps } from "next/app";
import AppLayout from "layouts/AppLayout";
import { NextLink } from "next-ui-wrapper";
import { navBarLinks } from "data";

const links = navBarLinks.map((link) => ({ ...link, Component: NextLink }));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout links={links}>
      <Component {...pageProps} />
    </AppLayout>
  );
}
