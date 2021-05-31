import React from "react";
import { useNavigation } from "react-navigation-hooks";
import { SharedElement } from "react-navigation-shared-element";

import { GameProps } from "../../types/Game";

import {
  Game,
  GameImage,
  GameDetails,
  Console,
  GameName,
  GameYear,
} from "./styles";

interface GameCardProps {
  game: GameProps;
}

const GameResultCard: React.FC<GameCardProps> = ({ game }) => {
  const { navigate } = useNavigation();

  function handleGamePressed(game: GameProps) {
    navigate("Game", { game });
  }

  return (
    <Game onPress={() => handleGamePressed(game)}>
      <SharedElement id={game.id}>
        <GameImage
          source={{
            uri: game.cover,
          }}
        />
      </SharedElement>

      <GameDetails>
        <Console numberOfLines={1}>{game.platforms.join(", ")}</Console>
        <GameName numberOfLines={1}>{game.name}</GameName>
      </GameDetails>
      <GameYear>{game.year}</GameYear>
    </Game>
  );
};

export default GameResultCard;
