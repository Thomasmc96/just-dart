import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Player = {
  id: string;
  name: string;
  score: number;
  darts_left: number;
};
export type GameState = {
  players: Player[];
  playerTurn: number;
  round: number;
  startingPoints: number;
};

type GameContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  addPlayer: (name: string) => void;
  addStartingPoints: (startingPoints: number) => void;
};

export const GameContext = createContext<GameContextType>({
  gameState: {
    players: [],
    playerTurn: 0,
    round: 0,
    startingPoints: 0,
  },
  setGameState: () => {},
  addPlayer: () => {},
  addStartingPoints: () => {},
});

type GameProviderProps = {
  children: React.ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    playerTurn: 0,
    round: 0,
    startingPoints: 0,
  });

  const addPlayer = (name: string) => {
    const id = uuidv4();

    setGameState((prev) => ({
      ...prev,
      players: [
        ...prev.players,
        {
          id: id,
          name,
          score: prev.startingPoints,
          darts_left: 3,
        },
      ],
    }));
  };

  const addStartingPoints = (startingPoints: number) => {
    setGameState((prev) => ({
      ...prev,
      startingPoints: startingPoints,
    }));
  };

  return (
    <GameContext.Provider
      value={{ gameState, setGameState, addPlayer, addStartingPoints }}
    >
      {children}
    </GameContext.Provider>
  );
};
