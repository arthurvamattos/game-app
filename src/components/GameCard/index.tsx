import React from "react";
import { Feather } from "@expo/vector-icons";
import { Animated, Image, Vibration } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
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
  DeleteGameButton,
  DeleteGameButtonComplement,
} from "./styles";

interface GameCardProps {
  game: GameProps;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { navigate } = useNavigation();

  function handleDelete(id: string) {
    Vibration.vibrate();
  }
  function handleGamePressed(game: GameProps) {
    navigate("Game", { game });
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
    </Swipeable>
  );
};

export default GameCard;
