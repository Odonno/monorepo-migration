import { useEffect, useState } from "react";
import { Button } from "ui";
import { COLUMNS, GridApiResponse, ROWS } from "data";

export default function Game() {
  const [state, setState] = useState<GridApiResponse | undefined>();

  const fetchGrid = async () => {
    const response = await fetch("/api/game");
    const data = await response.json();
    setState(data);
  };

  useEffect(() => {
    fetchGrid();
  }, []);

  const onCellClicked = async (x: number, y: number) => {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y }),
    });
    const data = await response.json();
    setState(data);
  };

  const handleReplayButtonClicked = async () => {
    const response = await fetch("/api/game", {
      method: "DELETE",
    });
    const data = await response.json();
    setState(data);
  };

  return (
    <div>
      <h1>Game</h1>
      <p>
        <span>This is a game called </span>
        <a href="https://wikipedia.org/wiki/Tic-tac-toe">Tic Tac Toe</a>
        <span>.</span>
      </p>

      {!state ? (
        <p>Loading...</p>
      ) : (
        <>
          {state.status === "won" && <p>You won!</p>}
          {state.status === "draw" && <p>{"It's a draw!"}</p>}
          {state.status === "lose" && <p>You lost!</p>}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: "10px",
              width: 150,
              height: 150,
              margin: "15px 0",
            }}
          >
            {ROWS.flatMap((y) => {
              return COLUMNS.map((x) => {
                const cell = state.grid.find(
                  (cell) => cell.x === x && cell.y === y
                );
                const disabled = !!cell?.value;

                return (
                  <Button
                    key={`${x}-${y}`}
                    label={cell?.value}
                    onClick={() => onCellClicked(x, y)}
                    disabled={disabled}
                  />
                );
              });
            })}
          </div>

          {state.status && (
            <Button label="Replay" onClick={handleReplayButtonClicked} />
          )}
        </>
      )}
    </div>
  );
}
