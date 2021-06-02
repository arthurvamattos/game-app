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

    // check if the game is already saved by searching for the id
    if (ids.indexOf(game.id) !== -1) {
      const gamePosition = ids.indexOf(game.id);

      // check that the saved game list is the same as the one we're trying to
      if (games[gamePosition].list !== list) {
        const updatedGames = games.splice(gamePosition, 1, {
          ...game,
          list,
          favorite,
        });
        await AsyncStorage.setItem(
          "@game-app:games",
          JSON.stringify(updatedGames)
        );
      }
    } else {
      await AsyncStorage.setItem(
        "@game-app:games",
        JSON.stringify([...games, { ...game, list, favorite }])
      );
    }

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
}

export { GameService };
