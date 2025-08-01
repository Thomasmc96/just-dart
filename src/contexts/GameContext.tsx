import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type Player = {
  id: string;
  name: string;
  score: number;
  roundScore: number;
  scores: number[];
  wins: number;
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
  startGame: (resetWins: boolean) => void;
  registerScore: (score: number) => void;
  removePlayer: (id: string) => void;
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
  removePlayer: () => {},
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
          scores: [],
          wins: 0,
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

  const startGame = (resetWins: boolean = false) => {
    setGameState((prev) => ({
      ...prev,
      winner: null,
      players: prev.players.map((player) => ({
        ...player,
        score: prev.startingPoints,
        scores: [],
        roundScore: 0,
        wins: resetWins ? 0 : player.wins,
      })),
    }));
  };

  const registerScore = (score: number) => {
    setGameState((prev) => {
      const currentPlayer = prev.players[prev.playerTurn];
      const currentScore = currentPlayer.score;
      const newScore = currentScore - score;

      if (newScore === 0) {
        const updatedPlayers = prev.players.map((player, index) => {
          if (index === prev.playerTurn) {
            return {
              ...player,
              wins: player.wins + 1,
            };
          }
          return player;
        });
        return {
          ...prev,
          winner: currentPlayer,
          players: updatedPlayers,
        };
      }

      // If score would go below zero, skip subtraction and just move to next turn
      if (newScore < 0) {
        const nextPlayerTurn = (prev.playerTurn + 1) % prev.players.length;

        let updatedPlayers = prev.players.map((player, index) => {
          if (index === prev.playerTurn) {
            return {
              ...player,
              score: player.score + player.roundScore,
              roundScore: 0,
              scores: [...player.scores, score],
            };
          }
          return player;
        });

        updatedPlayers[nextPlayerTurn].scores = [];

        return {
          ...prev,
          players: updatedPlayers,
          playerTurn: nextPlayerTurn,
          round: nextPlayerTurn === 0 ? prev.round + 1 : prev.round,
        };
      }

      let updatedPlayers = prev.players.map((player, index) => {
        if (index === prev.playerTurn) {
          return {
            ...player,
            score: player.score - score,
            roundScore: player.roundScore + score,
            scores: [...player.scores, score],
          };
        }
        return player;
      });

      let nextPlayerTurn = prev.playerTurn;
      let nextRound = prev.round;

      if (currentPlayer.scores.length === 2) {
        // updatedPlayers[prev.playerTurn].darts_left = 3;
        updatedPlayers[prev.playerTurn].roundScore = 0;
        nextPlayerTurn = (prev.playerTurn + 1) % updatedPlayers.length; // loop back i 1+1 % 2 = 0

        if (nextPlayerTurn === 0) {
          nextRound += 1;
        }

        updatedPlayers[nextPlayerTurn].scores = [];
      }

      return {
        ...prev,
        players: updatedPlayers,
        playerTurn: nextPlayerTurn,
        round: nextRound,
      };
    });
  };

  const removePlayer = (id: string) => {
    setGameState((prev) => {
      const updatedPlayers = prev.players.filter((player) => player.id !== id);

      const newPlayerTurn =
        prev.playerTurn >= updatedPlayers.length ? 0 : prev.playerTurn;

      return {
        ...prev,
        players: updatedPlayers,
        playerTurn: newPlayerTurn,
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
        removePlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
