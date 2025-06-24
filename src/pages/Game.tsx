import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function Game() {
  const { gameState } = useContext(GameContext);

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 bg-gray-900 text-gray-100 px-6"></main>
  );
}
