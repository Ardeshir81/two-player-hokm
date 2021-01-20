import { useEffect, useState } from "react";
import { GAME_EVENTS, IGameState } from "../common.typings";
import CenterMessage from "./CenterMessage";
import ChooseHokm from "./ChooseHokm";
import { GameStateContext } from "./GameStateContext";
import LoginPage, { useBooleanState } from "./LoginPage";
import OtherPlayerCards from "./OtherPlayerCards";
import PickingPage from "./PickingPage";
import PlayerCards from "./PlayerCards";
import PlayingPage from "./PlayingPage";
import ShowHokm from "./ShowHokm";
import { socketService } from "./socket-service";

export default function App() {
  const [socketConnected, toggleSocketConnected] = useBooleanState(false);
  const [gameState, setGameState] = useState<IGameState | null>(null);

  useEffect(() => {
    socketService.onConnected(() => toggleSocketConnected());
    socketService.on(GAME_EVENTS.GAME_STATE, setGameState);
  }, []);

  if (gameState) {
    return (
      <div className="gameboard-container">
        <GameStateContext.Provider value={gameState}>
          <OtherPlayerCards />
          <ChooseHokm />
          <ShowHokm />
          <PickingPage />
          <PlayingPage />
          <PlayerCards />
        </GameStateContext.Provider>
      </div>
    );
  } else if (socketConnected) return <LoginPage />;
  else return <CenterMessage>Waiting for Server</CenterMessage>;
}
