import { useQuery } from "react-query";

import { DadJokeAPI } from "../api";

export function useDadJoke(searchConfig: { page: number }) {
  return useQuery(["dadJoke", searchConfig], DadJokeAPI.fetchAll);
}
