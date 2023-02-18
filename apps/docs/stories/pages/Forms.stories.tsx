import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FormsPage from "home/pages/forms";

export default {
  title: "Web/Pages",
  component: FormsPage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof FormsPage>;

export const Forms: ComponentStory<typeof FormsPage> = () => <FormsPage />;
