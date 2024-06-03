import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IMovieData, RecomandationProps } from "../../types";
import { ArrowIcon } from "../Icons";
import { Movie } from "../Movies";
import "./Recomendation.css";

const Recomandation = ({ data }: RecomandationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const moviesPerRow = 3; // Количество фильмов в строке
  const totalMovies = data.length - 1; // Отображаем на один фильм меньше
  const movieRowRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    movieRowRef.current?.classList.add('slide-out-right');
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.ceil(totalMovies / moviesPerRow) - 1 : prevIndex - 1
      );
      movieRowRef.current?.classList.remove('slide-out-right');
      movieRowRef.current?.classList.add('slide-in-left');
      setTimeout(() => {
        movieRowRef.current?.classList.remove('slide-in-left');
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    movieRowRef.current?.classList.add('slide-out-left');
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Math.ceil(totalMovies / moviesPerRow) - 1 ? 0 : prevIndex + 1
      );
      movieRowRef.current?.classList.remove('slide-out-left');
      movieRowRef.current?.classList.add('slide-in-right');
      setTimeout(() => {
        movieRowRef.current?.classList.remove('slide-in-right');
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  const startIndex = currentIndex * moviesPerRow;
  const endIndex = startIndex + moviesPerRow;
  const currentMovies = data.slice(startIndex, endIndex);

  return (
    <div className="recomandation">
        <div className="recomBtns">
             <button onClick={handlePrev} className="nav-button left-btn"><ArrowIcon/></button>
            <button onClick={handleNext} className="nav-button"><ArrowIcon/></button>
        </div>
     
      <div className="movie-container">
        <div className="movie-row" ref={movieRowRef}>
          {currentMovies.map((movie) => (
            <NavLink to={"/movies/" + movie.id} className="NavLink" key={movie.id}>
              <Movie data={movie} />
            </NavLink>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export { Recomandation };
