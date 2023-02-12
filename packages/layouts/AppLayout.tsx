import { ReactNode } from "react";
import { NavBar, NavBarLink } from "ui";

export type AppLayoutProps = {
  links: NavBarLink[];
  children: ReactNode;
};

export default function AppLayout({ links, children }: AppLayoutProps) {
  return (
    <>
      <NavBar links={links} />
      {children}
    </>
  );
}
