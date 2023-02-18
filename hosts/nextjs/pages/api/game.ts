import { COMPUTER_VALUE, GridApiResponse, USER_VALUE } from "data";
import { createDefaultGridApiResponse, getWinner } from "functions";
import type { NextApiRequest, NextApiResponse } from "next";

const response = createDefaultGridApiResponse();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GridApiResponse>
) {
  if (req.method === "GET") {
    res.status(200).json(response);
    return;
  }

  if (req.method === "POST") {
    const { x, y } = req.body;

    const selectedCell = response.grid.find(
      (cell) => cell.x === x && cell.y === y
    );

    if (!selectedCell) {
      res.status(400);
      return;
    }

    if (!!selectedCell.value) {
      res.status(400);
      return;
    }

    if (!!response.status) {
      res.status(400);
      return;
    }

    selectedCell.value = USER_VALUE;

    const winner = getWinner(response.grid);
    if (winner === USER_VALUE) {
      response.status = "won";
      res.status(200).json(response);
      return;
    }
    if (winner === COMPUTER_VALUE) {
      response.status = "lose";
      res.status(200).json(response);
      return;
    }

    const isGameEnded = response.grid.every((cell) => !!cell.value);
    if (isGameEnded) {
      response.status = "draw";
      res.status(200).json(response);
      return;
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
      res.status(200).json(response);
      return;
    }
    if (winner_2 === COMPUTER_VALUE) {
      response.status = "lose";
      res.status(200).json(response);
      return;
    }

    const isGameEnded_2 = response.grid.every((cell) => !!cell.value);
    if (isGameEnded_2) {
      response.status = "draw";
      res.status(200).json(response);
      return;
    }

    res.status(200).json(response);
    return;
  }

  if (req.method === "DELETE") {
    response.grid.forEach((cell) => {
      cell.value = undefined;
    });
    response.status = undefined;

    res.status(200).json(response);
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]).status(405);
}
