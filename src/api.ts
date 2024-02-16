export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  score: number;
  ratings: number;
}

const api = {
  list: async (): Promise<Restaurant[]> => {
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOBI-iIMsOrSJM7Q5MjyOxoOYk5h005feJpojroduwQWtmrjVOhXKHNa1smtDO_AEx4lLrsS70uI9W/pub?output=csv",
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
    });

    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOBI-iIMsOrSJM7Q5MjyOxoOYk5h005feJpojroduwQWtmrjVOhXKHNa1smtDO_AEx4lLrsS70uI9W/pub?output=csv",
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
    });

    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
};

export default api;
