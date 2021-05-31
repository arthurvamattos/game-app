import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.58:3333",
});

export default api;

export function getGameQuery(name: string) {
  return `search "${name}";
  fields name, rating, aggregated_rating, cover.url, release_dates.y, summary, platforms.name;`;
}
