interface IInput{
    placeholder: string,
    className: string,
    onChange: Function,
    value: string,
}

interface IGenre {
    name: string;
}

interface IMovieData{ 
        id: number,
        "name": string,
        "alternativeName": string,
        "enName": string,
        "type": string,
        "typeNumber": number,
        "year": number,
        "description": string,
        "shortDescription": string,
        "status": string,
        "rating": {
          "kp": number,
          "imdb": number,
          "filmCritics": number,
          "russianFilmCritics": number,
          "await": number
        },
        "votes": {
          "kp": number,
          "imdb": number,
          "filmCritics": number,
          "russianFilmCritics": number,
          "await": number
        },
        "movieLength": string,
        "totalSeriesLength": string,
        "seriesLength": string,
        "ratingMpaa": string,
        "ageRating": string,
        "poster"?: {
            "url": string,
            "previewUrl": string
          },
        "genres"?: IGenre[],
        "top10": string,
        "top250": string,
        "isSeries": boolean,
        "ticketsOnSale": boolean
}

interface IMovieDataResponse{
    "docs": IMovieData[],
    "total": number,
    "limit": number,
    "page": number,
    "pages": number
}

interface ILoadMovies{
    limit: number,
    page: number,
}

interface IStoreState{
    movies: IMovieDataResponse
}

interface MovieProps {
    data: IMovieData;
}
  

export type {
    IInput,
    IMovieData,
    IMovieDataResponse,
    ILoadMovies,
    IStoreState,
    MovieProps,
}