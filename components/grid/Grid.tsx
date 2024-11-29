import React from "react";
import Tile from "./Tile";

function Grid() {
  return (
    <div>
      <div className="w-full grid grid-cols-30 h-screen overflow-y-clip">
        {Array.from(Array(30 * 30), (i) => (
          <Tile key={i} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
