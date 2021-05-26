import React from "react";
import { Feather } from "@expo/vector-icons";
import { Animated, Vibration } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { GameProps } from "../../types/Game";

import {
  Game,
  GameImage,
  GameDetails,
  Console,
  GameName,
  GameYear,
  DeleteGameButton,
  DeleteGameButtonComplement,
} from "./styles";

interface GameCardProps {
  game: GameProps;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  function handleDelete(id: string) {
    Vibration.vibrate();
  }

  return (
    <Swipeable
      overshootRight={false}
      rightThreshold={80}
      overshootFriction={40}
      useNativeAnimations={true}
      renderRightActions={() => (
        <Animated.View>
          <DeleteGameButton onPress={() => handleDelete(game.id)}>
            <Feather name="trash" size={24} color="#fff" />
          </DeleteGameButton>
          <DeleteGameButtonComplement />
        </Animated.View>
      )}
    >
      <Game>
        <GameImage
          source={{
            uri: game.cover,
          }}
        />
        <GameDetails>
          <Console>{game.console}</Console>
          <GameName>{game.name}</GameName>
        </GameDetails>
        <GameYear>{game.year}</GameYear>
      </Game>
    </Swipeable>
  );
};

export default GameCard;
