import { AxiosResponse } from "axios";

import { API } from "../utils";

type SearchConfig = {
  page: number;
};

function DadJokeAPI() {
  return {
    fetchAll: async ({
      queryKey,
    }: {
      queryKey: (string | SearchConfig)[];
    }): Promise<AxiosResponse> => {
      const params = queryKey[1];
      const response = await API.get("/searchs", { params });
      return response;
    },
  };
}

export default DadJokeAPI();
