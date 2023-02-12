import { NextLink } from "next-ui-wrapper";
import { NavBarLink } from "ui";

export const links: NavBarLink[] = [
  {
    key: "/",
    href: "/",
    children: "Home",
    Component: NextLink,
  },
  {
    key: "/docs",
    href: "/docs",
    children: "Docs",
    Component: NextLink,
  },
];
