import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameProps } from "../types/Game";

class FavoriteService {
  async store(game: GameProps) {
    const storegedData = await AsyncStorage.getItem("@game-app:favorites");
    const favorites = storegedData
      ? (JSON.parse(storegedData) as GameProps[])
      : [];

    const ids = favorites.map((game) => game.id);

    const gamePosition = ids.indexOf(game.id);
    if (gamePosition !== -1) {
      favorites.splice(gamePosition, 1, game);
    } else {
      favorites.push(game);
    }

    await AsyncStorage.setItem(
      "@game-app:favorites",
      JSON.stringify(favorites)
    );
    return game;
  }

  async index() {
    const storegedData = await AsyncStorage.getItem("@game-app:favorites");
    const games = storegedData ? (JSON.parse(storegedData) as GameProps[]) : [];

    return games;
  }

  async find(id: string) {
    const storegedData = await AsyncStorage.getItem("@game-app:favorites");
    const games = storegedData ? (JSON.parse(storegedData) as GameProps[]) : [];

    const game = games.filter((game) => game.id === id)[0];

    return game;
  }

  async delete(game: GameProps) {
    const storegedData = await AsyncStorage.getItem("@game-app:favorites");
    const games = storegedData ? (JSON.parse(storegedData) as GameProps[]) : [];

    const ids = games.map((game) => game.id);

    const gamePosition = ids.indexOf(game.id);
    if (gamePosition !== -1) {
      games.splice(gamePosition, 1);
    }

    await AsyncStorage.setItem("@game-app:favorites", JSON.stringify(games));
  }
}

export { FavoriteService };
