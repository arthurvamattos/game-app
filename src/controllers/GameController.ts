import { GameService } from "../services/GameService";
import { GameProps } from "../types/Game";

class GameController {
  gameService = new GameService();

  async store(game: GameProps, list: string, favorite: boolean) {
    try {
      const newGame = await this.gameService.store(game, list, favorite);

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
}

export { GameController };
