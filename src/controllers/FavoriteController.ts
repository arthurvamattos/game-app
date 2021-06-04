import { FavoriteService } from "../services/FavoriteService";
import { GameProps } from "../types/Game";
import { CategoryController } from "./CategoryController";

class FavoriteController {
  favoriteService = new FavoriteService();

  async store(game: GameProps) {
    try {
      const favorite = await this.favoriteService.store(game);

      return favorite;
    } catch {
      return { message: "Something went wrong, please try again" };
    }
  }

  async index() {
    const favorites = await this.favoriteService.index();

    return favorites;
  }

  async find(id: string) {
    const favorite = await this.favoriteService.find(id);

    return favorite;
  }

  async delete(game: GameProps) {
    await this.favoriteService.delete(game);
  }
}

export { FavoriteController };
