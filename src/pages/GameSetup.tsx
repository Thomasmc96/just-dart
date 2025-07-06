import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function GameSetup() {
  const navigate = useNavigate();
  const { gameState, addPlayer, addStartingPoints, startGame, removePlayer } =
    useContext(GameContext);

  const [newPlayer, setNewPlayer] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onAddNewPlayer = () => {
    if (newPlayer.trim() === "") return;
    addPlayer(newPlayer.trim());
    setNewPlayer("");
  };

  const onStartGame = () => {
    if (gameState.players.length === 0) {
      setError("Der er ikke tilføjet nogle spillere");
      return;
    }
    if (gameState.startingPoints === 0) {
      setError("Vælg en start score");
      return;
    }

    startGame();
    navigate("/game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 bg-gray-900 text-gray-100 px-6">
      <h1 className="text-4xl font-bold mb-4 text-green-400">Opret spil</h1>
      <p className="mb-8 text-gray-300 text-center max-w-md">
        Klar til at spille? Her kan du hurtigt opsætte dit dartspil og følge
        scoren.
      </p>

      {/* Player Section */}
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg mb-6 shadow-md">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Spillere</h2>
        <div className="mb-4 space-y-1">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-md"
            >
              <p className="text-gray-200">{player.name}</p>
              <button
                type="button"
                onClick={() => removePlayer(player.id)}
                className="p-2 text-white transition duration-150"
                aria-label={`Fjern ${player.name}`}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Navn"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            className="flex-1 rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={onAddNewPlayer}
            className="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            Tilføj
          </button>
        </div>
      </div>

      {/* Starting Points Section */}
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Start score
        </h2>
        <div className="flex gap-6">
          {[121, 301, 501].map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="gameType"
                value={value}
                checked={gameState.startingPoints === value}
                onChange={(e) =>
                  addStartingPoints(Number(e.currentTarget.value))
                }
                className="accent-green-500 w-5 h-5"
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

      {/* Start Game Button */}
      <Button onClick={onStartGame} className="mt-2">
        Start spil
      </Button>
    </main>
  );
}
