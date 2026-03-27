import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number = 1,
): Promise<Movie[]> => {
  const options = {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  const response = await axios.get<FetchMoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    options,
  );
  return response.data.results;
};
