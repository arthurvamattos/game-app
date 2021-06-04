import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { StoregedGameProps } from "../services/GameService";
import { GameProps } from "../types/Game";

interface GlobalContextData {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  games: StoregedGameProps[];
  setGames: Dispatch<SetStateAction<StoregedGameProps[]>>;
  favorites: GameProps[];
  setFavorites: Dispatch<SetStateAction<GameProps[]>>;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<StoregedGameProps[]>([]);
  const [favorites, setFavorites] = useState<GameProps[]>([]);

  return (
    <GlobalContext.Provider
      value={{ search, setSearch, games, setGames, favorites, setFavorites }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  return context;
}
