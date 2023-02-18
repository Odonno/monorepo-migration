export const USER_VALUE = "X" as const;
export const COMPUTER_VALUE = "O" as const;

export type CellValue = typeof USER_VALUE | typeof COMPUTER_VALUE;

export type Cell = {
  x: number;
  y: number;
  value?: CellValue;
};

export type Grid = Cell[];

export type GridStatus = "won" | "draw" | "lose";

export type GridApiResponse = {
  status?: GridStatus;
  grid: Grid;
};

export const COLUMNS = [0, 1, 2];
export const ROWS = [0, 1, 2];
