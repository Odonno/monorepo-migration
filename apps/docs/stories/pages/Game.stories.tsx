import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GamePage from "home/pages/game";

export default {
  title: "Web/Pages",
  component: GamePage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof GamePage>;

export const Game: ComponentStory<typeof GamePage> = () => <GamePage />;
