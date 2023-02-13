import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CounterPage from "home/pages/counter";

export default {
  title: "Web/Pages",
  component: CounterPage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CounterPage>;

export const Counter: ComponentStory<typeof CounterPage> = () => (
  <CounterPage />
);
