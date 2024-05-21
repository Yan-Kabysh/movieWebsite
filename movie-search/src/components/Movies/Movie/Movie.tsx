import { IMovieData, MovieProps } from "../../../types";
import "./Movie.css";



const Movie = ({ data }: MovieProps) => {
    return (
        <div className="movie">
            <img src={data.poster?.url === undefined ? "" : data.poster.url} alt={data.name} />
            <p>{data.name}</p>
            <div>
            <ul>
                {data.genres?.map((genre, index) => (
                    <li key={index}>{genre.name}</li>
                ))}
            </ul>
            <p>{data.rating.imdb}</p>
            </div>
        </div>
    );
};

export { Movie };
