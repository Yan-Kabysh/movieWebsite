import { IMovieData, MovieProps } from "../../../types";
import { EmptyPoster } from "../../EmptyPoster";
import "./Movie.css";



const Movie = ({ data }: MovieProps) => {
    console.log(data)
    const rating = data.rating.imdb === 0 ? data.rating.kp : data.rating.imdb
    return (
        <div className="movie">
               <p className={"rating " + ((rating) >= 7 ? "green" : (rating >= 5 ? "yellow" : "red"))}>{rating}</p>
            {data.poster?.url === undefined || data.poster?.url === null ?
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
