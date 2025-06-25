import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function Game() {
  const { gameState } = useContext(GameContext);

  const scoreInputs = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
    50,
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 bg-gray-900 text-gray-100 px-6">
      <h1 className="text-4xl font-bold mb-8 text-green-400">
        {gameState.startingPoints}
      </h1>
      <div className="flex flex-row justify-around w-full items-center">
        {gameState.players.map((player, i) => (
          <div className={gameState.playerTurn === i ? "text-2xl" : ""}>
            <p>{player.name}</p>
            <p>{player.score}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-row w-full m-5 justify-around">
        <button className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded">
          Double
        </button>
        <button className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded">
          Triple
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center mt-2 ">
        {scoreInputs.map((scoreInput) => (
          <button
            type="button"
            className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded"
          >
            {scoreInput}
          </button>
        ))}
      </div>
    </main>
  );
}
