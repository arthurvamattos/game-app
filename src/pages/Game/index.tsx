import { Feather } from "@expo/vector-icons";
import React from "react";
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
} from "./styles";
import { GameProps } from "../../types/Game";

const Game = () => {
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
            <HeaderButton>
              <Feather name="heart" size={24} color="#F6F5FA" />
            </HeaderButton>
          </HeaderButtonWrapper>
        </Header>
      </SharedElement>
      <Content>
        <Console>{game.console}</Console>
        <Name numberOfLines={1}>{game.name}</Name>
        <Description numberOfLines={7}>{game.description}</Description>
        <RateContainer>
          <RateWrapper>
            <Feather name="star" size={28} color={theme.colors.text} />
            <View>
              <RateTitle>Member ratings (IGDB)</RateTitle>
              <Rate>95</Rate>
            </View>
          </RateWrapper>
          <RateWrapper>
            <Feather name="star" size={28} color={theme.colors.text} />
            <View>
              <RateTitle>Critic ratings (IGDB)</RateTitle>
              <Rate>97</Rate>
            </View>
          </RateWrapper>
        </RateContainer>
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
