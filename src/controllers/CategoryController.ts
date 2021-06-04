import { CategoryService } from "../services/CategoryService";

class CategoryController {
  categoryService = new CategoryService();

  async store(categories: string[]) {
    await this.categoryService.store(categories);
  }

  async index() {
    const categories = await this.categoryService.index();

    return categories;
  }

  async update(categories: string[]) {
    await this.categoryService.update(Array.from(categories));
  }
}

export { CategoryController };
