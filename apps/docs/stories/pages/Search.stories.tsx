import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchPage from "home/pages/search";

export default {
  title: "Web/Pages",
  component: SearchPage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SearchPage>;

export const Search: ComponentStory<typeof SearchPage> = () => <SearchPage />;
