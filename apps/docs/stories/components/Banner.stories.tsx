import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Banner } from "ui";

export default {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["violet", "black"],
      },
    },
  },
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Violet = Template.bind({});
Violet.args = {
  label: "This the violet banner.",
  variant: "violet",
};

export const Black = Template.bind({});
Black.args = {
  label: "This the black banner.",
  variant: "black",
};
