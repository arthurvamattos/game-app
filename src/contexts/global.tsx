import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { StoregedGameProps } from "../services/GameService";

interface GlobalContextData {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  games: StoregedGameProps[];
  setGames: Dispatch<SetStateAction<StoregedGameProps[]>>;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<StoregedGameProps[]>([]);

  return (
    <GlobalContext.Provider value={{ search, setSearch, games, setGames }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  return context;
}
