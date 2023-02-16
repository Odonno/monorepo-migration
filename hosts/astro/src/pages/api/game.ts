import type { APIRoute } from "astro";

const USER_VALUE = "X" as const;
const COMPUTER_VALUE = "O" as const;

type Cell = {
  x: number;
  y: number;
  value?: typeof USER_VALUE | typeof COMPUTER_VALUE;
};

type Grid = Cell[];

type GridStatus = "won" | "draw" | "lose";

type GridApiResponse = {
  status?: GridStatus;
  grid: Grid;
};

const COLUMNS = [0, 1, 2];
const ROWS = [0, 1, 2];

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

    const winner = getWinner();
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

    const winner_2 = getWinner();
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
