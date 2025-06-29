import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type Player = {
  id: string;
  name: string;
  score: number;
  roundScore: number;
  darts_left: number;
};
export type GameState = {
  players: Player[];
  playerTurn: number;
  round: number;
  startingPoints: number;
  winner: Player | null;
};

type GameContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  addPlayer: (name: string) => void;
  addStartingPoints: (startingPoints: number) => void;
  startGame: () => void;
  registerScore: (score: number) => void;
};

export const GameContext = createContext<GameContextType>({
  gameState: {
    players: [],
    playerTurn: 0,
    round: 0,
    startingPoints: 0,
    winner: null,
  },
  setGameState: () => {},
  addPlayer: () => {},
  addStartingPoints: () => {},
  startGame: () => {},
  registerScore: () => {},
});

type GameProviderProps = {
  children: React.ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  // Initialize from localStorage if it exists, otherwise default state
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch {}
    }
    return {
      players: [],
      playerTurn: 0,
      round: 0,
      startingPoints: 0,
    };
  });

  // Save gameState to localStorage on every change
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

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
          roundScore: 0,
          darts_left: 3,
        },
      ],
    }));
  };

  const addStartingPoints = (startingPoints: number) => {
    setGameState((prev) => ({
      ...prev,
      startingPoints: startingPoints,
      players: prev.players.map((player) => ({
        ...player,
        score: startingPoints,
      })),
    }));
  };

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      winner: null,
      players: prev.players.map((player) => ({
        ...player,
        score: prev.startingPoints,
      })),
    }));
  };

  const registerScore = (score: number) => {
    setGameState((prev) => {
      const currentPlayer = prev.players[prev.playerTurn];
      const currentScore = currentPlayer.score;
      const newScore = currentScore - score;

      if (newScore === 0) {
        return {
          ...prev,
          winner: currentPlayer,
        };
      }

      // If score would go below zero, skip subtraction and just move to next turn
      if (newScore < 0) {
        const nextPlayerTurn = (prev.playerTurn + 1) % prev.players.length;

        const updatedPlayers = prev.players.map((player, index) => {
          if (index === prev.playerTurn) {
            return {
              ...player,
              score: player.score + player.roundScore,
              roundScore: 0,
              darts_left: 3,
            };
          }
          return player;
        });

        return {
          ...prev,
          players: updatedPlayers,
          playerTurn: nextPlayerTurn,
          round: nextPlayerTurn === 0 ? prev.round + 1 : prev.round,
        };
      }

      const updatedPlayers = prev.players.map((player, index) => {
        if (index === prev.playerTurn) {
          return {
            ...player,
            score: player.score - score,
            roundScore: player.roundScore + score,
            darts_left: player.darts_left - 1,
          };
        }
        return player;
      });

      let nextPlayerTurn = prev.playerTurn;
      let nextRound = prev.round;

      if (currentPlayer.darts_left === 1) {
        updatedPlayers[prev.playerTurn].darts_left = 3;
        updatedPlayers[prev.playerTurn].roundScore = 0;
        nextPlayerTurn = (prev.playerTurn + 1) % updatedPlayers.length; // loop back i 1+1 % 2 = 0

        if (nextPlayerTurn === 0) {
          nextRound += 1;
        }
      }

      return {
        ...prev,
        players: updatedPlayers,
        playerTurn: nextPlayerTurn,
        round: nextRound,
      };
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        addPlayer,
        addStartingPoints,
        startGame,
        registerScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
