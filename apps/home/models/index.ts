export type Cell = {
  x: number;
  y: number;
  value?: "X" | "O";
};

export type Grid = Cell[];

export type GridStatus = "won" | "draw" | "lose";

export type GridApiResponse = {
  status?: GridStatus;
  grid: Grid;
};
