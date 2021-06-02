import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
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
  AddButton,
  AddButtonText,
  Icon,
  ModalTitle,
  ListsButtonsWrapper,
  ListButton,
  ListButtonText,
  Loading,
} from "./styles";
import { GameProps } from "../../types/Game";
import { Modalize } from "react-native-modalize";
import { GameController } from "../../controllers/GameController";
import { ActivityIndicator } from "react-native";

const Game = () => {
  const [favorite, setFavorite] = useState(false);
  const [list, setList] = useState("Now Playing");
  const [loading, setLoading] = useState(false);
  const modalizeRef = useRef<Modalize>(null);

  const { theme } = useTheme();
  const { goBack, getParam } = useNavigation();
  const game: GameProps = getParam("game");

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  async function handleAddToList() {
    setLoading(true);
    const gameController = new GameController();
    await gameController.store(game, list, favorite);
    setLoading(false);
    goBack();
  }

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      {loading && (
        <Loading>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Loading>
      )}
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
        <AddButton onPress={handleOpenModal}>
          <AddButtonText>Add to list</AddButtonText>
        </AddButton>
      </Content>

      <Modalize
        ref={modalizeRef}
        snapPoint={280}
        handlePosition="inside"
        modalStyle={{
          backgroundColor: theme.colors.foreground,
          paddingHorizontal: 24,
          paddingTop: 36,
        }}
      >
        <ModalTitle>Select the list</ModalTitle>
        <ListsButtonsWrapper>
          <ListButton
            onPress={() => setList("Now Playing")}
            selected={list === "Now Playing"}
          >
            <ListButtonText selected={list === "Now Playing"}>
              Now Playing
            </ListButtonText>
          </ListButton>
          <ListButton
            onPress={() => setList("Done")}
            selected={list === "Done"}
          >
            <ListButtonText selected={list === "Done"}>Done</ListButtonText>
          </ListButton>
        </ListsButtonsWrapper>

        <AddButton onPress={handleAddToList}>
          <AddButtonText>{`Add to ${list}`}</AddButtonText>
        </AddButton>
      </Modalize>
    </Container>
  );
};

Game.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const game = navigation.getParam("game");
  return [game.id];
};

export default Game;
