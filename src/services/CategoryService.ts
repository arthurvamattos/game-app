import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StoregedCategoryProps {
  name: string;
}

class CategoryService {
  async store(categories: string[]) {
    const storegedData = await AsyncStorage.getItem("@game-app:categories");

    const storegedCategories = storegedData
      ? (JSON.parse(storegedData) as StoregedCategoryProps[])
      : [];

    const names = storegedCategories.map((category) => category.name);

    categories.forEach((category) => {
      if (!names.includes(category)) {
        storegedCategories.push({ name: category });
      }
    });

    await AsyncStorage.setItem(
      "@game-app:categories",
      JSON.stringify(storegedCategories)
    );
  }

  async index() {
    const storegedData = await AsyncStorage.getItem("@game-app:categories");
    const categories = storegedData
      ? (JSON.parse(storegedData) as StoregedCategoryProps[])
      : [];

    return categories;
  }
}

export { CategoryService };
