import React from "react";
import { Feather } from "@expo/vector-icons";
import { Animated, Vibration } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import { SharedElement } from "react-navigation-shared-element";

import { GameController } from "../../controllers/GameController";
import { StoregedGameProps } from "../../services/GameService";

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
import { useGlobalContext } from "../../contexts/global";

interface GameCardProps {
  game: StoregedGameProps;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { navigate } = useNavigation();
  const { games, setGames } = useGlobalContext();

  async function handleDelete(game: StoregedGameProps) {
    Vibration.vibrate();
    const gameController = new GameController();
    await gameController.delete(game);

    const ids = games.map((game) => game.id);

    const gamePosition = ids.indexOf(game.id);
    if (gamePosition !== -1) {
      const updatedGames = games.filter((item) => item.id !== game.id);
      setGames(updatedGames);
    }
  }
  function handleGamePressed(game: StoregedGameProps) {
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
          <DeleteGameButton onPress={() => handleDelete(game)}>
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
