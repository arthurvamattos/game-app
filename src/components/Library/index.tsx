import React from "react";
import { View } from "react-native";
import { StoregedGameProps } from "../../services/GameService";

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
interface LibraryProps {
  games: StoregedGameProps[];
}

function Library({ games }: LibraryProps) {
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

      <Favorites games={games.filter((game) => game.favorite)} />

      <Title>Now Playing</Title>

      <View>
        {games
          .filter((game) => game.list === "Now Playing")
          .map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
      </View>

      <Title>Done</Title>

      <View>
        {games
          .filter((game) => game.list === "Done")
          .map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
      </View>
    </Container>
  );
}

export default Library;
