import { ReactNode } from "react";
import Link from "next/link";

export type NextLinkProps = {
  href: string;
  children: ReactNode;
};

export const NextLink = (props: NextLinkProps) => {
  return <Link {...props} />;
};
