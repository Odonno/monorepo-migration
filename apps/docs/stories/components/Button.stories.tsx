import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "ui";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Button",
  disabled: true,
};
