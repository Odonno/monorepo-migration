import {
  CellValue,
  COLUMNS,
  COMPUTER_VALUE,
  Grid,
  GridApiResponse,
  ROWS,
  USER_VALUE,
} from "data";

export const createDefaultGridApiResponse = (): GridApiResponse => {
  return {
    grid: ROWS.flatMap((y) => {
      return COLUMNS.map((x) => {
        return { x, y };
      });
    }),
  };
};

export const getWinner = (grid: Grid): CellValue | undefined => {
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
