import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useGlobalContext } from "../../contexts/global";
import { CategoryController } from "../../controllers/CategoryController";
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

function Library() {
  const [categories, setCategories] = useState<string[]>([]);
  const { games, selectedCategories, setSelectedCategories } =
    useGlobalContext();

  useEffect(() => {
    async function loadCategories() {
      const categoryController = new CategoryController();
      const categories = await categoryController.index();
      setCategories(categories);
    }
    loadCategories();
  }, [games]);

  function handleCategorySelected(name: string) {
    if (name === "All") {
      setSelectedCategories(["All"]);
    } else {
      if (selectedCategories.includes(name)) {
        setSelectedCategories((oldState) =>
          oldState.filter((category) => category !== name)
        );
      } else {
        if (selectedCategories[0] === "All") {
          setSelectedCategories([name]);
        } else {
          setSelectedCategories((oldState) => [...oldState, name]);
        }
      }
    }
  }

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(["All"]);
    }
  }, [selectedCategories]);

  const CategoryElement: React.FC<CategoryProps> = ({ name, status }) => (
    <CategoryItem active={status} onPress={() => handleCategorySelected(name)}>
      <CategoryName active={status}>{name}</CategoryName>
    </CategoryItem>
  );

  return (
    <Container>
      <CategoryList>
        <CategoryElement
          status={selectedCategories.includes("All")}
          name="All"
        />
        {categories !== undefined &&
          categories.map((category) => (
            <CategoryElement
              status={selectedCategories.includes(category)}
              name={category}
              key={category}
            />
          ))}
      </CategoryList>

      <Favorites />

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

      {games.filter((game) => game.list === "I Want Play").length > 0 && (
        <>
          <Title>I Want Play</Title>

          <View>
            {games
              .filter((game) => game.list === "I Want Play")
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
