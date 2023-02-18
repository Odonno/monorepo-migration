import {
  COLUMNS,
  COMPUTER_VALUE,
  GridApiResponse,
  ROWS,
  USER_VALUE,
} from "data";
import type { NextApiRequest, NextApiResponse } from "next";

const response: GridApiResponse = {
  grid: ROWS.flatMap((y) => {
    return COLUMNS.map((x) => {
      return { x, y };
    });
  }),
};

const getWinner = () => {
  const grid = response.grid;

  const getWinnerInRow = (row: number) => {
    const rowCells = grid.filter((cell) => cell.y === row);

    if (rowCells.every((cell) => cell.value === USER_VALUE)) {
      return USER_VALUE;
    }
    if (rowCells.every((cell) => cell.value === COMPUTER_VALUE)) {
      return COMPUTER_VALUE;
    }
  };

  const getWinnerInColumn = (column: number) => {
    const columnCells = grid.filter((cell) => cell.x === column);

    if (columnCells.every((cell) => cell.value === USER_VALUE)) {
      return USER_VALUE;
    }
    if (columnCells.every((cell) => cell.value === COMPUTER_VALUE)) {
      return COMPUTER_VALUE;
    }
  };

  const getWinnerInLeftDiagonal = () => {
    const diagonalCells = grid.filter((cell) => cell.x === cell.y);

    if (diagonalCells.every((cell) => cell.value === USER_VALUE)) {
      return USER_VALUE;
    }
    if (diagonalCells.every((cell) => cell.value === COMPUTER_VALUE)) {
      return COMPUTER_VALUE;
    }
  };

  const getWinnerInRightDiagonal = () => {
    const diagonalCells = grid.filter((cell) => cell.x + cell.y === 2);

    if (diagonalCells.every((cell) => cell.value === USER_VALUE)) {
      return USER_VALUE;
    }
    if (diagonalCells.every((cell) => cell.value === COMPUTER_VALUE)) {
      return COMPUTER_VALUE;
    }
  };

  const getWinnerInRows = ROWS.map((row) => getWinnerInRow(row)).find(
    (winner) => !!winner
  );
  const getWinnerInColumns = COLUMNS.map((column) =>
    getWinnerInColumn(column)
  ).find((winner) => !!winner);
  const getWinnerInDiagonals =
    getWinnerInLeftDiagonal() || getWinnerInRightDiagonal();

  return getWinnerInRows || getWinnerInColumns || getWinnerInDiagonals;
};

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

    const winner = getWinner();
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

    const winner_2 = getWinner();
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
