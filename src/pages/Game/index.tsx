import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../contexts/theme";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

import {
  Container,
  Header,
  HeaderButtonWrapper,
  HeaderButton,
  Content,
  Console,
  Name,
  Description,
  RateContainer,
  RateWrapper,
  RateTitle,
  Rate,
  AddButton,
  AddButtonText,
  Icon,
} from "./styles";
import { GameProps } from "../../types/Game";

const Game = () => {
  const [favorite, setFavorite] = useState(false);

  const { theme } = useTheme();
  const { goBack, getParam } = useNavigation();
  const game: GameProps = getParam("game");

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      <SharedElement id={game.id}>
        <Header
          source={{
            uri: game.cover,
          }}
          resizeMode="cover"
        >
          <HeaderButtonWrapper intensity={40} tint="dark">
            <HeaderButton onPress={() => goBack()}>
              <Feather name="arrow-left" size={24} color="#F6F5FA" />
            </HeaderButton>
          </HeaderButtonWrapper>
          <HeaderButtonWrapper intensity={40} tint="dark">
            <HeaderButton onPress={() => setFavorite((oldState) => !oldState)}>
              <Icon name="heart" size={24} active={favorite} />
            </HeaderButton>
          </HeaderButtonWrapper>
        </Header>
      </SharedElement>
      <Content>
        <Console numberOfLines={1}>{game.platforms.join(", ")}</Console>
        <Name numberOfLines={1}>{game.name}</Name>
        <Description numberOfLines={7}>{game.summary}</Description>
        <AddButton onPress={() => {}}>
          <AddButtonText>Add to list</AddButtonText>
        </AddButton>
      </Content>
    </Container>
  );
};

Game.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const game = navigation.getParam("game");
  return [game.id];
};

export default Game;
