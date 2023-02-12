import { FC, ReactNode } from "react";

export type NavBarLink = {
  key: string;
  href: string;
  children: ReactNode;
  Component?: FC<Pick<NavBarLink, "href" | "children">>;
};

export type NavBarProps = {
  links: NavBarLink[];
};

export const NavBar = (props: NavBarProps) => {
  const { links } = props;

  return (
    <nav>
      <ul>
        {links.map((link) => {
          const { key, Component, href, children } = link;

          if (Component) {
            return (
              <li key={key}>
                <Component href={href}>{children}</Component>
              </li>
            );
          }

          return (
            <li key={key}>
              <a href={href}>{children}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
