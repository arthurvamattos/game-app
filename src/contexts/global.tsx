import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { StoregedGameProps } from "../services/GameService";
import { GameProps } from "../types/Game";

interface GlobalContextData {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  games: StoregedGameProps[];
  setGames: Dispatch<SetStateAction<StoregedGameProps[]>>;
  setFilteredGames: Dispatch<SetStateAction<StoregedGameProps[]>>;
  favorites: GameProps[];
  setFavorites: Dispatch<SetStateAction<GameProps[]>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<StoregedGameProps[]>([]);
  const [filteredGames, setFilteredGames] = useState<StoregedGameProps[]>([]);
  const [favorites, setFavorites] = useState<GameProps[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);

  useEffect(() => {
    if (selectedCategories.includes("All")) {
      setFilteredGames(games);
    } else {
      setFilteredGames(
        games.filter((game) => {
          let hasCategory = false;
          game.platforms.forEach((platform) => {
            if (selectedCategories.includes(platform)) {
              hasCategory = true;
            }
          });
          return hasCategory;
        })
      );
    }
  }, [selectedCategories, games]);

  return (
    <GlobalContext.Provider
      value={{
        search,
        setSearch,
        games: filteredGames,
        setGames,
        setFilteredGames,
        favorites,
        setFavorites,
        selectedCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  return context;
}
