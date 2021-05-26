import React from "react";
import { FlatList } from "react-native";
import fakeGames from "../../utils/fakeGames";

import Favorites from "../Favorites";
import GameCard from "../GameCard";
import {
  Container,
  CategoryList,
  CategoryItem,
  CategoryName,
  Title,
} from "./styles";

interface CategoryProps {
  name: string;
  status: boolean;
}

function Library() {
  const CategoryElement: React.FC<CategoryProps> = ({ name, status }) => (
    <CategoryItem active={status}>
      <CategoryName active={status}>{name}</CategoryName>
    </CategoryItem>
  );

  return (
    <Container>
      <CategoryList>
        <CategoryElement status={true} name="PS4" />
        <CategoryElement status={false} name="PS5" />
        <CategoryElement status={false} name="PS3" />
        <CategoryElement status={false} name="PS2" />
        <CategoryElement status={false} name="PS1" />
      </CategoryList>

      <Favorites />

      <Title>Now Playing</Title>

      <FlatList
        data={fakeGames}
        keyExtractor={(game) => String(game.id)}
        renderItem={({ item }) => <GameCard game={item} />}
      />
    </Container>
  );
}

export default Library;
