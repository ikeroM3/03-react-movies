import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie.ts";
import { fetchMovies } from "../../services/movieService.ts";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

import SearchBar from "../SearchBar/SearchBar.tsx";
export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setError(false);
      setLoading(true);

      const data = await fetchMovies(query);
      if (data.length === 0) {
        setError(true);
        return;
      }
      setMovies(data);
    } catch {
      setError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {movies.length > 0 && !loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster />
    </>
  );
}
