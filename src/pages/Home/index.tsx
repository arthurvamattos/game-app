import React, { useState } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../contexts/theme";

import Library from "../../components/Library";
import SearchResults from "../../components/SearchResults";

import {
  Container,
  Heading,
  HeadingWrapper,
  SubTitle,
  ToggleTheme,
  Search,
  SearchIcon,
  SearchInput,
} from "./styles";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");

  const { theme, toggleTheme } = useTheme();

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

      {search === "" ? <Library /> : <SearchResults />}
    </Container>
  );
};

export default Home;
