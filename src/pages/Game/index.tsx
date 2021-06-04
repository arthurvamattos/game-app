import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
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
  ListButtonsRow,
} from "./styles";
import { GameProps } from "../../types/Game";
import { Modalize } from "react-native-modalize";
import { GameController } from "../../controllers/GameController";
import { ActivityIndicator } from "react-native";
import { useGlobalContext } from "../../contexts/global";
import { FavoriteController } from "../../controllers/FavoriteController";

const Game = () => {
  const [favorite, setFavorite] = useState(false);
  const [list, setList] = useState("Now Playing");
  const [loading, setLoading] = useState(false);
  const [listButtonText, setListButtonText] = useState("Add to list");
  const modalizeRef = useRef<Modalize>(null);

  const { theme } = useTheme();
  const { games, setGames, setSearch, favorites, setFavorites } =
    useGlobalContext();

  const { goBack, getParam } = useNavigation();
  const game: GameProps = getParam("game");

  useEffect(() => {
    async function loadGame() {
      const gameController = new GameController();
      const favoriteController = new FavoriteController();
      const storegedGame = await gameController.find(game.id);
      const isFavorite = await favoriteController.find(game.id);

      if (isFavorite) {
        setFavorite(true);
      }

      if (storegedGame) {
        setList(storegedGame.list);
        setListButtonText("Change list");
      }
    }
    loadGame();
  }, []);

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  async function handleAddToList(shouldGoBack: boolean) {
    setLoading(true);
    const gameController = new GameController();
    await gameController.store(game, list, favorite);

    let updatedGames = games;
    const ids = updatedGames.map((game) => game.id);
    const gamePosition = ids.indexOf(game.id);

    if (gamePosition !== -1) {
      setGames((oldState) =>
        oldState.map((item) => {
          if (item.id === game.id) {
            return {
              ...game,
              list,
            };
          }
          return item;
        })
      );
    } else {
      setGames((oldState) => [...oldState, { ...game, list }]);
    }

    setSearch("");
    setLoading(false);
    shouldGoBack && goBack();
  }

  async function handleFavorite() {
    const oldState = favorite;
    setFavorite(!oldState);
    const favoriteController = new FavoriteController();
    if (oldState) {
      await favoriteController.delete(game);
      setFavorites((oldState) =>
        oldState.filter((favorite) => favorite.id !== game.id)
      );
    } else {
      await favoriteController.store(game);
      setFavorites((oldState) => [...oldState, game]);
    }
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
            <HeaderButton onPress={handleFavorite}>
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
          <AddButtonText>{listButtonText}</AddButtonText>
        </AddButton>
      </Content>

      <Modalize
        ref={modalizeRef}
        snapPoint={340}
        handlePosition="inside"
        modalStyle={{
          backgroundColor: theme.colors.foreground,
          paddingHorizontal: 24,
          paddingTop: 36,
        }}
      >
        <ModalTitle>Select the list</ModalTitle>
        <ListsButtonsWrapper>
          <ListButtonsRow>
            <ListButton
              onPress={() => setList("Now Playing")}
              selected={list === "Now Playing"}
              size="small"
            >
              <ListButtonText selected={list === "Now Playing"}>
                Now Playing
              </ListButtonText>
            </ListButton>
            <ListButton
              onPress={() => setList("Done")}
              selected={list === "Done"}
              size="small"
            >
              <ListButtonText selected={list === "Done"}>Done</ListButtonText>
            </ListButton>
          </ListButtonsRow>
          <ListButton
            onPress={() => setList("I Want Play")}
            selected={list === "I Want Play"}
            size="large"
          >
            <ListButtonText selected={list === "I Want Play"}>
              I Want Play
            </ListButtonText>
          </ListButton>
        </ListsButtonsWrapper>

        <AddButton onPress={() => handleAddToList(true)}>
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
