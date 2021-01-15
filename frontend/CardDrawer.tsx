import { CARD_FORMAT, ICard } from "../common.typings";
//@ts-ignore
import deckAsPng from "./deck.png";

export const cardWidth = 126;

export default function CardDrawer(props: { card: ICard }) {
  let height = -9;
  if (props.card.format === CARD_FORMAT.HEARTS) height = -204;
  if (props.card.format === CARD_FORMAT.DIAMONDS) height = -399;
  if (props.card.format === CARD_FORMAT.CLUBS) height = -595;

  return (
    <div
      style={{
        backgroundImage: `url(${deckAsPng})`,
        width: cardWidth,
        height: 188,
        backgroundSize: "1387%",
        display: "inline-block",
        backgroundPositionX: -7 + (props.card.number - 1) * -134,
        backgroundPositionY: height,
      }}
    />
  );
}
