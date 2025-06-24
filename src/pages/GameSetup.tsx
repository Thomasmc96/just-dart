import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";

export default function GameSetup() {
  const { gameState, addPlayer, setStartingPoints } = useContext(GameContext);

  const [newPlayer, setNewPlayer] = useState("");

  const onAddNewPlayer = () => {
    addPlayer(newPlayer);
    setNewPlayer("");
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
            <p>{player.name}</p>
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
          onInput={(e) => setStartingPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="gameType121">121</label>
        <input
          type="radio"
          name="gameType"
          id="gameType301"
          value={"301"}
          onInput={(e) => setStartingPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="gameType301">301</label>
        <input
          type="radio"
          name="gameType"
          id="gameType501"
          value={"501"}
          onInput={(e) => setStartingPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="gameType501">501</label>
      </div>
    </main>
  );
}
