import { useContext } from "react";
import { CARD_FORMAT } from "../common.typings";
import { isChooseHokm } from "./ChooseHokm";
import FormatDrawer from "./FormatDrawer";
import { GameStateContext } from "./GameStateContext";

export default function ShowHokm() {
  const gameState = useContext(GameStateContext);

  if (isChooseHokm(gameState)) return <></>;

  if (!gameState.hokm) return <></>;

  const color =
    gameState.hokm === CARD_FORMAT.DIAMONDS ||
    gameState.hokm === CARD_FORMAT.HEARTS
      ? "#fe5454"
      : "#000000";

  return (
    <div className="hokm" style={{ color: color, backgroundColor: color + 40 }}>
      <p className="hokm-symbol">
        <FormatDrawer format={gameState.hokm} />
      </p>
      <p className="hokm-word">{gameState.hokm}</p>
    </div>
  );
}
