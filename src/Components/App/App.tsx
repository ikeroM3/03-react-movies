import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar.tsx";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie.ts";
import { useEffect } from "react";

import { GetArticlesRes } from "../../services/movieService.ts";

export default function App() {
  const [movie, setMovie] = useState<Movie[]>([]);

  const fetchMovies = async (searchTopic: string) => {
    try {
      const setMovie = await GetArticlesRes(searchTopic);
      setMovie(setMovie);
    } catch {
      console.log(Error);
    }
  };
  return (
    <>
      <SearchBar onSubmit={fetchMovies} />
      <Toaster />
    </>
  );
}

export default App;
