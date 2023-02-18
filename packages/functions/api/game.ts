import { ApiResponse, COMPUTER_VALUE, GridApiResponse, USER_VALUE } from "data";
import { getWinner } from "../game";

export const get = (response: GridApiResponse): ApiResponse => {
  return {
    response,
  };
};

export type GameApiPostBody = {
  x: number;
  y: number;
};

export const post = (
  response: GridApiResponse,
  body: GameApiPostBody
): ApiResponse => {
  const { x, y } = body;

  const selectedCell = response.grid.find(
    (cell) => cell.x === x && cell.y === y
  );

  if (!selectedCell) {
    return {
      status: 400,
    };
  }

  if (!!selectedCell.value) {
    return {
      status: 400,
    };
  }

  if (!!response.status) {
    return {
      status: 400,
    };
  }

  selectedCell.value = USER_VALUE;

  const winner = getWinner(response.grid);
  if (winner === USER_VALUE) {
    response.status = "won";

    return {
      response,
    };
  }
  if (winner === COMPUTER_VALUE) {
    response.status = "lose";

    return {
      response,
    };
  }

  const isGameEnded = response.grid.every((cell) => !!cell.value);
  if (isGameEnded) {
    response.status = "draw";

    return {
      response,
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
      response,
    };
  }
  if (winner_2 === COMPUTER_VALUE) {
    response.status = "lose";

    return {
      response,
    };
  }

  const isGameEnded_2 = response.grid.every((cell) => !!cell.value);
  if (isGameEnded_2) {
    response.status = "draw";
  }

  return {
    response,
  };
};

export const del = (response: GridApiResponse): ApiResponse => {
  response.grid.forEach((cell) => {
    cell.value = undefined;
  });
  response.status = undefined;

  return {
    response,
  };
};
