import { useEffect } from "react";
import {
  CARD_FORMAT_SUIT_ORDER,
  GAME_ACTION,
  IGameState,
} from "../common.typings";
import { socketService } from "./socket-service";

const AUTO_HOKM = false;
const AUTO_DROP = false;
const AUTO_PICK = false;
const AUTO_PLAY = false;

export function useDeveloperOptions(gameState: IGameState | null) {
  useEffect(() => {
    if (
      AUTO_HOKM &&
      gameState?.nextAction === GAME_ACTION.CHOOSE_HOKM &&
      gameState?.player.isHaakem
    ) {
      const hokmIndex = Math.floor(Math.random() * 4);
      socketService.selectHokm(CARD_FORMAT_SUIT_ORDER[hokmIndex]);
    }

    if (
      AUTO_DROP &&
      gameState?.nextAction === GAME_ACTION.DROP_TWO &&
      gameState?.player.cards.length === 5
    ) {
      socketService.dropTwo([
        gameState?.player.cards[0],
        gameState?.player.cards[1],
      ]);
    }

    if (
      AUTO_PICK &&
      gameState?.nextAction === GAME_ACTION.PICK_CARDS &&
      gameState?.player.isTurn
    ) {
      if (gameState?.mustPickCard) {
        socketService.pickCard();
      } else if (gameState?.mustRefuseCard) {
        socketService.refuseCard();
      } else {
        Math.random() > 0.5
          ? socketService.pickCard()
          : socketService.refuseCard();
      }
    }

    if (
      AUTO_PLAY &&
      gameState?.nextAction === GAME_ACTION.PLAY &&
      gameState?.player.isTurn
    ) {
      if (gameState?.cardOnGround) {
        const cardWithTheSameFormat = gameState?.player.cards.find(
          (card) => card.format === gameState?.cardOnGround.format
        );
        if (cardWithTheSameFormat) {
          socketService.play(cardWithTheSameFormat);
        } else {
          socketService.play(gameState?.player.cards[0]);
        }
      } else {
        socketService.play(gameState?.player.cards[0]);
      }
    }
  }, [gameState]);
}