import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavBar, NavBarLink } from "ui";

const navBarLinks: NavBarLink[] = [
  {
    key: "/",
    href: "/",
    children: "Home",
  },
  {
    key: "/counter",
    href: "/counter",
    children: "Counter",
  },
  {
    key: "/forms",
    href: "/forms",
    children: "Forms",
  },
];

export default {
  title: "Components/NavBar",
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: navBarLinks,
};
