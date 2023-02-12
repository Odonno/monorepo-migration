import { ReactNode } from "react";
import { NavBar } from "ui";
import { links } from "../data";

export type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <NavBar links={links} />
      {children}
    </>
  );
}
