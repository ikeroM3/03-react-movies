import axios from "axios";
import type { Movie } from "../types/movie";

interface GetArticlesRes {
  hits: Movie[];
}

export const fetchMovies = async (quary: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer VITE_TMDB_TOKEN",
    },
  };
  const response = await axios.get<GetArticlesRes>(
    `https://api.themoviedb.org/3/search/movie?query=${quary}`,
    options,
  );
  // return response.data.hits;
  console.log(response);
};
