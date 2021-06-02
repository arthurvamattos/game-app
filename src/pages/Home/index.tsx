import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { debounce } from "lodash";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../contexts/theme";
import { useGlobalContext } from "../../contexts/global";

import Library from "../../components/Library";
import SearchResults from "../../components/SearchResults";

import { GameProps } from "../../types/Game";
import ApiResponse from "../../types/ApiResponse";
import api, { getGameQuery } from "../../services/api";

import {
  Container,
  Heading,
  HeadingWrapper,
  SubTitle,
  ToggleTheme,
  Search,
  SearchIcon,
  SearchInput,
  MinimumLettersNotice,
} from "./styles";
import { GameController } from "../../controllers/GameController";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [minimumLettersNotice, setMinimumLettersNotice] = useState(false);
  const [results, setResults] = useState<GameProps[]>([]);

  const { games, setGames, search, setSearch } = useGlobalContext();
  const { theme, toggleTheme } = useTheme();

  const loadResults = useCallback(
    debounce(async () => {
      setMinimumLettersNotice(false);
      setLoading(true);

      const response = await api.post<ApiResponse[]>(
        "https://api.igdb.com/v4/games",
        getGameQuery(search)
      );
      if (response.data) {
        const serializedGames =
          response.data.length > 0
            ? response.data
                .filter(
                  (game) =>
                    game.cover !== undefined &&
                    !!game.release_dates &&
                    !!game.release_dates[0].y
                )
                .map((game) => {
                  const cover = `https:${game.cover.url.replace(
                    "thumb",
                    "1080p"
                  )}`;

                  const platforms = game.platforms
                    ? game.platforms.map((platform) => platform.name)
                    : ["Not found"];

                  return {
                    id: String(game.id),
                    name: game.name,
                    summary: game.summary,
                    rating: "95",
                    aggregated_rating: "97",
                    year: game.release_dates[0].y.toString(),
                    cover,
                    platforms,
                  };
                })
            : [];

        setResults(serializedGames);
      }

      setLoading(false);
    }, 1000),
    [search]
  );

  useEffect(() => {
    if (search.length >= 3) {
      loadResults();
    } else {
      setMinimumLettersNotice(true);
    }
  }, [search]);

  useEffect(() => {
    async function loadGames() {
      const gameController = new GameController();
      const games = await gameController.index();
      setGames(games);
    }
    loadGames();
  }, []);

  return (
    <Container
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <HeadingWrapper>
        <View>
          <Heading>Hello there,</Heading>
          <SubTitle>Build your game library!</SubTitle>
        </View>

        <ToggleTheme onPress={() => toggleTheme()}>
          <Heading>
            {theme.title === "dark" ? (
              <Feather name="moon" size={24} color={theme.colors.text} />
            ) : (
              <Feather name="sun" size={24} color={theme.colors.text} />
            )}
          </Heading>
        </ToggleTheme>
      </HeadingWrapper>

      <Search>
        <SearchIcon name="search" size={24} color={theme.colors.text} />
        <SearchInput
          placeholder="Search a game"
          placeholderTextColor={theme.colors.lightText}
          value={search}
          onChangeText={setSearch}
        />
      </Search>

      {loading ? (
        <MinimumLettersNotice>Loading...</MinimumLettersNotice>
      ) : (search && !minimumLettersNotice) === "" ? (
        <Library games={games} />
      ) : minimumLettersNotice ? (
        <MinimumLettersNotice>
          You must enter three letters before starting the search
        </MinimumLettersNotice>
      ) : (
        <SearchResults games={results} />
      )}
    </Container>
  );
};

export default Home;
