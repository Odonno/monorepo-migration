import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GamePage from "home/pages/game";

const COLUMNS = [0, 1, 2];
const ROWS = [0, 1, 2];

const response = {
  grid: ROWS.flatMap((y) => {
    return COLUMNS.map((x) => {
      return { x, y };
    });
  }),
};

export default {
  title: "Web/Pages",
  component: GamePage,
  parameters: {
    layout: "fullscreen",
    mockData: [
      {
        url: "/api/game",
        method: "GET",
        status: 200,
        response,
      },
      {
        url: "/api/game",
        method: "POST",
        status: 200,
        response,
      },
      {
        url: "/api/game",
        method: "DELETE",
        status: 200,
        response,
      },
    ],
  },
} as ComponentMeta<typeof GamePage>;

export const Game: ComponentStory<typeof GamePage> = () => <GamePage />;
