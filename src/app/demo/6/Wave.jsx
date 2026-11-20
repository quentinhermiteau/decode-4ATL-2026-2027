"use client";

import { memo } from "react";

const toneMap = {
  0: "👋",
  1: "👋🏻",
  2: "👋🏼",
  3: "👋🏽",
  4: "👋🏾",
  5: "👋🏿",
};

function Wave({ options }) {
  console.log("Rendering Wave");
  return (
    <span role="img" aria-label="hand waving">
      {toneMap[options.toneIndex]}
    </span>
  );
}

export default memo(Wave);
