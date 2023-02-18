import type { APIRoute } from "astro";
import { COMPUTER_VALUE, USER_VALUE } from "data";
import { createDefaultGridApiResponse, getWinner } from "functions";

const response = createDefaultGridApiResponse();

export const all: APIRoute = async ({ request }) => {
  if (request.method === "GET") {
    return {
      body: JSON.stringify(response),
    };
  }

  if (request.method === "POST") {
    const { x, y } = await request.json();

    const selectedCell = response.grid.find(
      (cell) => cell.x === x && cell.y === y
    );

    if (!selectedCell) {
      return {
        status: 400,
      } as Response;
    }

    if (!!selectedCell.value) {
      return {
        status: 400,
      } as Response;
    }

    if (!!response.status) {
      return {
        status: 400,
      } as Response;
    }

    selectedCell.value = USER_VALUE;

    const winner = getWinner(response.grid);
    if (winner === USER_VALUE) {
      response.status = "won";
      return {
        body: JSON.stringify(response),
      };
    }
    if (winner === COMPUTER_VALUE) {
      response.status = "lose";
      return {
        body: JSON.stringify(response),
      };
    }

    const isGameEnded = response.grid.every((cell) => !!cell.value);
    if (isGameEnded) {
      response.status = "draw";
      return {
        body: JSON.stringify(response),
      };
    }

    const availableCells = response.grid.filter((cell) => !cell.value);
    if (availableCells.length > 0) {
      const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];

      randomCell.value = COMPUTER_VALUE;
    }

    const winner_2 = getWinner(response.grid);
    if (winner_2 === USER_VALUE) {
      response.status = "won";
      return {
        body: JSON.stringify(response),
      };
    }
    if (winner_2 === COMPUTER_VALUE) {
      response.status = "lose";
      return {
        body: JSON.stringify(response),
      };
    }

    const isGameEnded_2 = response.grid.every((cell) => !!cell.value);
    if (isGameEnded_2) {
      response.status = "draw";
      return {
        body: JSON.stringify(response),
      };
    }

    return {
      body: JSON.stringify(response),
    };
  }

  if (request.method === "DELETE") {
    response.grid.forEach((cell) => {
      cell.value = undefined;
    });
    response.status = undefined;

    return {
      body: JSON.stringify(response),
    };
  }

  return {
    status: 405,
  } as Response;
};
