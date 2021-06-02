import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CategoryController } from "../../controllers/CategoryController";
import { StoregedCategoryProps } from "../../services/CategoryService";
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
  const [categories, setCategories] = useState<StoregedCategoryProps[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const categoryController = new CategoryController();
      const categories = await categoryController.index();
      setCategories(categories);
    }
    loadCategories();
  }, []);

  const CategoryElement: React.FC<CategoryProps> = ({ name, status }) => (
    <CategoryItem active={status}>
      <CategoryName active={status}>{name}</CategoryName>
    </CategoryItem>
  );

  return (
    <Container>
      <CategoryList>
        <CategoryElement status={true} name="All" />
        {categories.map((category) => (
          <CategoryElement
            status={false}
            name={category.name}
            key={category.name}
          />
        ))}
      </CategoryList>

      <Favorites games={games.filter((game) => game.favorite)} />

      {games.filter((game) => game.list === "Now Playing").length > 0 && (
        <>
          <Title>Now Playing</Title>

          <View>
            {games
              .filter((game) => game.list === "Now Playing")
              .map((game) => (
                <GameCard key={`now-playing-${game.id}`} game={game} />
              ))}
          </View>
        </>
      )}

      {games.filter((game) => game.list === "Done").length > 0 && (
        <>
          <Title>Done</Title>

          <View>
            {games
              .filter((game) => game.list === "Done")
              .map((game) => (
                <GameCard key={`done-${game.id}`} game={game} />
              ))}
          </View>
        </>
      )}
    </Container>
  );
}

export default Library;
