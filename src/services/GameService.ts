import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameProps } from "../types/Game";
export interface StoregedGameProps extends GameProps {
  list: string;
  favorite: boolean;
}
class GameService {
  async store(game: GameProps, list: string, favorite: boolean) {
    const storegedData = await AsyncStorage.getItem("@game-app:games");
    const games = storegedData
      ? (JSON.parse(storegedData) as StoregedGameProps[])
      : [];

    const ids = games.map((game) => game.id);

    const gamePosition = ids.indexOf(game.id);
    if (gamePosition !== -1) {
      games.splice(gamePosition, 1, {
        ...game,
        list,
        favorite,
      });
    } else {
      games.push({
        ...game,
        list,
        favorite,
      });
    }

    await AsyncStorage.setItem("@game-app:games", JSON.stringify(games));
    return game;
  }

  async index() {
    const storegedData = await AsyncStorage.getItem("@game-app:games");
    const games = storegedData
      ? (JSON.parse(storegedData) as StoregedGameProps[])
      : [];

    return games;
  }

  async find(id: string) {
    const storegedData = await AsyncStorage.getItem("@game-app:games");
    const games = storegedData
      ? (JSON.parse(storegedData) as StoregedGameProps[])
      : [];

    const game = games.filter((game) => game.id === id)[0];

    return game;
  }

  async delete(game: StoregedGameProps) {
    const storegedData = await AsyncStorage.getItem("@game-app:games");
    const games = storegedData
      ? (JSON.parse(storegedData) as StoregedGameProps[])
      : [];

    const ids = games.map((game) => game.id);

    const gamePosition = ids.indexOf(game.id);
    if (gamePosition !== -1) {
      games.splice(gamePosition, 1);
    }

    await AsyncStorage.setItem("@game-app:games", JSON.stringify(games));
  }
}

export { GameService };
