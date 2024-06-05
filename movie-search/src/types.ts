interface IInput{
    placeholder: string,
    className: string,
    onChange: Function,
    value: string,
}

interface IGenre {
    name: string;
}

export enum TABS{
    HOME = "home",
    TRENDS = "trends",
    FAVORITES = "favorites",
    SETTINGS = "settings"
}

interface ITansReducer{
    tab: TABS
}

interface IModal{
  isOpen: boolean,
  message: string,
  status: string
}

interface IModalState{
   modal: IModal
}

interface IStoreState{
    movies: IMovieDataResponse,
    ui: IUIState,
    user: IUserState,
    modal: IModalState
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
    movie?: ISelectedMovie
    search?: string,
    isSearch?: boolean,
    isFavorite?: boolean
}

interface ILoadMovies{
    limit: number,
    page: number,
    year?: number,
    rating?:string
    votes?: string,
    sortField?: string,
    sortType?: string,
    genre?: any,
    yearStateFrom?: string,
    yearStateTo?: string,
    ratingStateFrom?: string,
    ratingStateTo?: string,
    country?: any,

}
interface ISignUpUser{
  username: string,
  email: string,
  password: string,
}

interface ISignUp {
  username: string,
  password: string,
  email: string,
}


interface MovieProps {
    data: IMovieData;
}
  
interface IUserName {
    children: string,
}

interface ISearchData{
    limit: number,
    page: number,
    search: string,
}

export enum THEME_TYPES{
    LIGHT = "Light",
    DARK = "Dark"
}

interface IUIState{
    theme: THEME_TYPES,
    filtersState: boolean,
}

interface ISelectedMovieNames{
    "name": string,
    "language": string,
    "type": string
}

interface IPerson{
    "id": number,
    "photo": string,
    "name": string,
    "enName": string,
    "description": string,
    "profession": string,
    "enProfession": string
}

interface IWatchability{
    "name": string,
    "logo": {
      "url": string
    },
    "url": string
}

interface IAudienceCountry{
    "count": number,
    "country": string
}

interface ICountry{
    name: string
}

interface ISelectedMovie{
    "id": number,
    "externalId": {
      "kpHD": string
    },
    "name": string,
    "alternativeName": string,
    "enName": string,
    "names": ISelectedMovieNames[],
    "type": string,
    "typeNumber": number,
    "year": number,
    "description": string,
    "shortDescription": string,
    "slogan": string,
    "status": string,
    "rating": {
      "kp": number,
      "imdb": number,
      "filmCritics": number,
      "russianFilmCritics": number,
      "await": string
    },
    "votes": {
      "kp": number,
      "imdb": number,
      "filmCritics": number,
      "russianFilmCritics": number,
      "await": number
    },
    "movieLength": number,
    "totalSeriesLength": number,
    "seriesLength": number,
    "ratingMpaa": string,
    "ageRating": number,
    "poster": {
      "url": string,
      "previewUrl": string
    },
    "backdrop": {
      "url": string,
      "previewUrl": string
    },
    "genres": IGenre[],
    "countries": ICountry[],
    "persons": IPerson[],
    "budget": {
      "currency": string,
      "value": number
    },
    "premiere": {
      "country": string,
      "digital": string,
      "cinema": string
    },
    "watchability": {
      "items": IWatchability[]
    },
    "top10": number,
    "top250": number,
    "isSeries": boolean,
    "audience": IAudienceCountry[],
    "ticketsOnSale": boolean,
    "lists": string[],
    "networks": string,
    "createdAt": string,
    "updatedAt": string,
    "similarMovies": IMovieData[],
  }

  interface IUserState {
    user: IUser
    isLoadingSavedMovies?: boolean
}
interface IUser {
  id: number,
  username: string,
  email: string,
}

interface IChangePassword{
  id: number,
  currentPassword: string,
  newPassword: string
}

  interface RecomandationProps {
    data: IMovieData[]
  }

interface IIds{
  userId: number,
  movieId: number
}

export type {
    IInput,
    IMovieData,
    IMovieDataResponse,
    ILoadMovies,
    IStoreState,
    MovieProps,
    IUserName,
    ITansReducer,
    ISearchData,
    IUIState,
    ISelectedMovie,
    RecomandationProps,
    ISignUpUser,
    IUserState,
    IUser,
    ISignUp,
    IChangePassword,
    IIds,
    IModalState,
    IModal
}