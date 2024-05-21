import { IMovieData, MovieProps } from "../../../types";
import { EmptyPoster } from "../../EmptyPoster";
import "./Movie.css";



const Movie = ({ data }: MovieProps) => {
    return (
        <div className="movie">
               <p className={"rating " + ((data.rating.imdb) >= 7 ? "green" : (data.rating.imdb >= 5 ? "yellow" : "red"))}>{data.rating.imdb}</p>
            {data.poster?.url === undefined ?
            <EmptyPoster/> :
            
            <img src={data.poster.url} alt={data.name} className="posterImage"/>
            }
            <h4 className="movieName">{data.name ? data.name : data.alternativeName}</h4>
            <div>
            <ul className="movieGenreList">
                {data.genres?.map((genre, index) => (
                    <li className="movieGenre" key={index}>{genre.name}</li>
                ))}
            </ul>
         
            </div>
        </div>
    );
};

export { Movie };
