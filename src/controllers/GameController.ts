import { GameService, StoregedGameProps } from "../services/GameService";
import { GameProps } from "../types/Game";
import { CategoryController } from "./CategoryController";

class GameController {
  gameService = new GameService();

  async store(game: GameProps, list: string, favorite: boolean) {
    try {
      const newGame = await this.gameService.store(game, list, favorite);

      const categoryController = new CategoryController();
      await categoryController.store(game.platforms);

      return newGame;
    } catch {
      return { message: "Something went wrong, please try again" };
    }
  }

  async index() {
    const games = await this.gameService.index();

    return games;
  }

  async find(id: string) {
    const game = await this.gameService.find(id);

    return game;
  }

  async delete(game: StoregedGameProps) {
    await this.gameService.delete(game);
  }
}

export { GameController };
