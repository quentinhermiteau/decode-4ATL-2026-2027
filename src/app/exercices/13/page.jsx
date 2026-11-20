"use client";

import { useReducer } from "react";

const initialState = {
  past: [],
  count: 0,
  future: [],
};

function reducer(state, action) {
  const { past, count, future } = state;

  switch (action) {
    case "increment":
      // past [] count 0 future []
      // past [0] count 1 future []
      // past [0, 1] count 2 future []
      // past [0, 1, 2] count 3 future []
      return { ...state, past: [...past, count], count: count + 1 };
    case "decrement":
      return { ...state, past: [...past, count], count: count - 1 };
    case "undo":
      // past [0, 1, 2] count 3 future []
      // past [0, 1] count 2 future [3]
      return {
        count: past.at(-1),
        past: past.slice(0, -1),
        future: [...future, count],
      };
    case "redo":
      // past [0, 1] count 2 future [3]
      // past [0, 1, 2] count 2 future [3]
      // past [0, 1, 2] count 3 future [3]
      // past [0, 1, 2] count 3 future []
      return {
        past: [...past, count],
        count: future.at(-1),
        future: future.slice(0, -1),
      };
  }
}

export default function CounterWithUndoRedo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => dispatch("increment");
  const handleDecrement = () => dispatch("decrement");
  const handleUndo = () => dispatch("undo");
  const handleRedo = () => dispatch("redo");

  console.log(state);

  return (
    <div>
      <div id="notice">
        <p>
          Gère toute la gestion de ce compteur avec useReducer, on doit pouvoir
          incrémenter et décrémenter.
        </p>
        <p>
          Mais aussi, on doit pouvoir faire un undo ou un redo et donc revenir à
          la valeur précédente du compteur.
        </p>
      </div>
      <h1>Counter: {state.count}</h1>
      <button className="link" onClick={handleIncrement}>
        Increment
      </button>
      <button className="link" onClick={handleDecrement}>
        Decrement
      </button>
      <button
        className="link"
        onClick={handleUndo}
        disabled={!state.past.length}
      >
        Undo
      </button>
      <button
        className="link"
        onClick={handleRedo}
        disabled={!state.future.length}
      >
        Redo
      </button>
    </div>
  );
}
