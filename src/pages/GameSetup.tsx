import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function GameSetup() {
  const navigate = useNavigate();

  const { gameState, addPlayer, addStartingPoints, startGame } =
    useContext(GameContext);

  const [newPlayer, setNewPlayer] = useState<string>("");

  const [error, setError] = useState<string>("");

  console.log(gameState);

  const onAddNewPlayer = () => {
    addPlayer(newPlayer);
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
      <h1 className="text-4xl font-bold mb-8 text-green-400">Opret spil</h1>
      <p className="mb-6 text-gray-300">
        Klar til at spille? Her kan du hurtigt opsætte dit dartspil og følge
        scoren.
      </p>
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg mb-2">
        <h2 className="text-green-400">Spillere</h2>
        <div>
          {gameState.players.map((player) => (
            <p key={player.id}>{player.name}</p>
          ))}
        </div>
        <p>Tilføj spiller:</p>
        <input
          type="text"
          placeholder="Navn"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        />
        <button type="button" onClick={onAddNewPlayer}>
          Tilføj
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-green-400">Start score</h2>
        <input
          type="radio"
          name="gameType"
          id="gameType121"
          value={"121"}
          checked={gameState.startingPoints === 121}
          onChange={(e) => addStartingPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="gameType121">121</label>
        <input
          type="radio"
          name="gameType"
          id="gameType301"
          value={301}
          checked={gameState.startingPoints === 301}
          onChange={(e) => addStartingPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="gameType301">301</label>
        <input
          type="radio"
          name="gameType"
          id="gameType501"
          value={501}
          checked={gameState.startingPoints === 501}
          onChange={(e) => addStartingPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="gameType501">501</label>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <Button onClick={onStartGame}>Start spil</Button>
    </main>
  );
}
