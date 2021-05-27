import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "../../contexts/theme";
import {
  setStatusBarTranslucent,
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";

import {
  Container,
  Header,
  HeaderButtonWrapper,
  HeaderButton,
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
import { useNavigation, useRoute } from "@react-navigation/core";
import { GameProps } from "../../types/Game";

const Game: React.FC = () => {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameProps;

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      <Header
        source={{
          uri: game.cover,
        }}
        resizeMode="cover"
      >
        <HeaderButtonWrapper intensity={40} tint="dark">
          <HeaderButton onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#F6F5FA" />
          </HeaderButton>
        </HeaderButtonWrapper>

        <HeaderButtonWrapper intensity={40} tint="dark">
          <HeaderButton>
            <Feather name="heart" size={24} color="#F6F5FA" />
          </HeaderButton>
        </HeaderButtonWrapper>
      </Header>

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
    </Container>
  );
};

export default Game;
