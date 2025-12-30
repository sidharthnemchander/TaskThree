import { useEffect, useState } from "react";

const Board = ({ word }) => {
  const [rows, setRows] = useState(
    Array(10)
      .fill()
      .map(() => Array(5).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    const board = document.getElementById("board");
    if (board) board.focus();
  }, []);

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();

    if (key >= "A" && key <= "Z" && currentCol < 5) {
      const newRows = rows.map((r) => [...r]);
      newRows[currentRow][currentCol] = key;
      setRows(newRows);
      setCurrentCol(currentCol + 1);
    }

    if (e.key === "Backspace" && currentCol > 0) {
      const newRows = rows.map((r) => [...r]);
      newRows[currentRow][currentCol - 1] = "";
      setRows(newRows);
      setCurrentCol(currentCol - 1);
    }

    if (e.key === "Enter" && currentCol === 5) {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    }
  };

  return (
    <div
      id="board"
      tabIndex="0"
      onKeyDown={handleKeyPress}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        outline: "none",
      }}
    >
      {rows.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((cell, c) => (
            <div key={c}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
