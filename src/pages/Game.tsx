import { useContext, useState, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";

export default function Game() {
  const { gameState, registerScore } = useContext(GameContext);

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
    <main className="flex min-h-screen flex-col items-center pt-10 bg-gray-900 text-gray-100 px-3">
      <Link
        to="/game-setup"
        className="absolute top-4 left-4 text-gray-300 hover:text-white transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span className="hidden sm:inline">Tilbage</span>
      </Link>
      {gameState.winner !== null && <GameFinished />}
      {gameState.winner === null && (
        <>
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {gameState.players.map((player, i) => (
              <div
                key={player.id}
                className={`relative flex flex-col items-center border rounded-lg p-4 min-w-[120px] ${
                  gameState.playerTurn === i
                    ? "border-green-500 bg-green-900/20 text-green-400 scale-105"
                    : "border-gray-600 bg-gray-800"
                } transition-all`}
              >
                {player.wins > 0 && (
                  <p className="absolute top-1 right-1 text-white text-xs">
                    {player.wins > 1 && player.wins}👑
                  </p>
                )}
                <p className="text-lg font-semibold">{player.name}</p>
                <p className="text-2xl font-bold">{player.score}</p>
                {gameState.playerTurn === i && (
                  <p className="text-sm mt-1">
                    {"🎯".repeat(player.darts_left)}
                  </p>
                )}
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
                className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded-lg flex justify-center items-center border-gray-600 bg-gray-800 hover:bg-gray-700 peer-checked:text-red-500 peer-checked:border-red-500"
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
                className="border-solid border-1 w-18 h-18 mt-4 mr-4 rounded-lg flex justify-center items-center border-gray-600 bg-gray-800 hover:bg-gray-700 peer-checked:text-red-500 peer-checked:border-red-500"
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
                className={`w-18 h-18 m-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700 active:bg-green-600 active:scale-95 transition-all duration-150 text-lg font-bold`}
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

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: Math.floor(100),
        origin: { y: 0.6 },
      });
      count++;
      if (count >= 3) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-8 text-green-400">
        {gameState.winner?.name} vandt!
      </h1>
      <div className="flex gap-5">
        <Link to={"/game-setup"}>
          <Button>Gå tilbage</Button>
        </Link>
        <Button onClick={() => startGame(false)}>Nyt spil</Button>
      </div>
    </div>
  );
};
