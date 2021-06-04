import AsyncStorage from "@react-native-async-storage/async-storage";

class CategoryService {
  async store(categories: string[]) {
    const storegedData = await AsyncStorage.getItem("@game-app:categories");

    const storegedCategories = storegedData
      ? (JSON.parse(storegedData) as string[])
      : [];

    const categoriesSet = new Set();

    if (storegedCategories.length > 0) {
      storegedCategories.forEach((cat) => categoriesSet.add(cat));
    }
    categories.forEach((cat) => categoriesSet.add(cat));

    const array = Array.from(categoriesSet);

    await AsyncStorage.setItem("@game-app:categories", JSON.stringify(array));
  }

  async index() {
    const storegedData = await AsyncStorage.getItem("@game-app:categories");
    const categories = storegedData ? JSON.parse(storegedData) : [];

    return categories;
  }

  async update(categories: string[]) {
    const categoriesSet = new Set();
    categories.forEach((platform) => {
      categoriesSet.add(platform);
    });

    const array = Array.from(categoriesSet);

    await AsyncStorage.setItem("@game-app:categories", JSON.stringify(array));
  }
}

export { CategoryService };
