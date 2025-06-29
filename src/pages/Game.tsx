import { useContext, useState } from "react";
import { GameContext, type GameState } from "../contexts/GameContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Game() {
  const { gameState, registerScore, startGame } = useContext(GameContext);

  const [multiplier, setMultiplier] = useState<number>(1);

  const scoreInputs = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    25, 50,
  ];

  const onSetMultiplier = (e: React.FormEvent<HTMLInputElement>) => {
    let value = parseInt(e.currentTarget.value);

    if (value === multiplier) {
      setMultiplier(1);
      return;
    }

    setMultiplier(value);
  };

  const onRegisterScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    const score = parseInt(e.currentTarget.value) * multiplier;

    registerScore(score);

    setMultiplier(1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 bg-gray-900 text-gray-100 px-6">
      {gameState.winner !== null && <GameFinished />}
      {gameState.winner === null && (
        <>
          <h1 className="text-4xl font-bold mb-8 text-green-400">
            {gameState.startingPoints}
          </h1>
          <div className="flex flex-row justify-around w-full items-center">
            {gameState.players.map((player, i) => (
              <div
                key={player.id}
                className={
                  gameState.playerTurn === i ? "text-2xl text-green-400" : ""
                }
              >
                <p>{player.name}</p>
                <p>{player.score}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-row w-full m-5 justify-around">
            <div>
              <input
                type="radio"
                name="addScoreUp"
                id="addScoreUpDouble"
                className="hidden peer"
                checked={multiplier === 2}
                value={2}
                onClick={onSetMultiplier}
              />
              <label
                htmlFor="addScoreUpDouble"
                className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded flex justify-center items-center peer-checked:text-red-500"
              >
                Double
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="addScoreUp"
                id="addScoreUpTriple"
                className="hidden peer"
                checked={multiplier === 3}
                value={3}
                onClick={onSetMultiplier}
              />
              <label
                htmlFor="addScoreUpTriple"
                className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded flex justify-center items-center peer-checked:text-red-500"
              >
                Triple
              </label>
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-center mt-2 ">
            {scoreInputs.map((scoreInput) => (
              <button
                key={scoreInput}
                type="button"
                className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded"
                value={scoreInput}
                onClick={onRegisterScore}
              >
                {scoreInput === 50 ? "Bull" : scoreInput}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

const GameFinished = () => {
  const { gameState, startGame } = useContext(GameContext);

  console.log(gameState);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-8 text-green-400">
        {gameState.winner?.name} vandt!
      </h1>
      <div className="flex gap-5">
        <Link to={"/game-setup"}>
          <Button>Gå tilbage</Button>
        </Link>
        <Button onClick={startGame}>Nyt spil</Button>
      </div>
    </div>
  );
};
