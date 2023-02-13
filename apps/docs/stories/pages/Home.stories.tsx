import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HomePage from "home/pages";

export default {
  title: "Web/Pages",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HomePage>;

export const Home: ComponentStory<typeof HomePage> = () => <HomePage />;
