import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameProps } from "../types/Game";
import { CategoryController } from "../controllers/CategoryController";
export interface StoregedGameProps extends GameProps {
  list: string;
}
class GameService {
  async store(game: GameProps, list: string) {
    const storegedData = await AsyncStorage.getItem("@game-app:games");
    const games = storegedData
      ? (JSON.parse(storegedData) as StoregedGameProps[])
      : [];

    const ids = games.map((game) => game.id);

    const gamePosition = ids.indexOf(game.id);
    if (gamePosition !== -1) {
      if (games[gamePosition].list !== list) {
        games.splice(gamePosition, 1, {
          ...game,
          list,
        });
      }
    } else {
      games.push({
        ...game,
        list,
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

    const favorites = new Array();
    games.forEach((game) => {
      favorites.push(game.platforms);
    });

    const categoryController = new CategoryController();
    categoryController.update(favorites);

    await AsyncStorage.setItem("@game-app:games", JSON.stringify(games));
  }
}

export { GameService };
