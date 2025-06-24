import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import { GameProvider } from "./contexts/GameContext";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game-setup" element={<GameSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
