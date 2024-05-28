import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputActionMeta } from "react-select/dist/declarations/src";
import Select from 'react-select';
import { setFiltersState } from "../../redux/actionCreaters/uiActionCreaters";
import "./Filters.css"
import { IStoreState, THEME_TYPES } from "../../types";
import { loadMovies } from "../../redux/actionCreaters/moviesActionCreators";
const Filters = () =>{

    const theme = useSelector((state: IStoreState) => state.ui.theme)

    const customStyles = {
        control: (provided: any) => ({
          ...provided,
          backgroundColor: theme === THEME_TYPES.DARK ? '#323537' : '#fff',
          borderColor: theme === THEME_TYPES.DARK ? '#555' : '#ccc',
          color: theme === THEME_TYPES.DARK ? 'white' : 'black',
          borderRadius: "10px",
          height: '70px',
          border: "none"
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? theme === THEME_TYPES.DARK ? '#555' : '#ddd'
            : state.isFocused
            ? theme === THEME_TYPES.DARK ? '#444' : '#eee'
            : theme === THEME_TYPES.DARK ? '#3a3a3a' : '#fff',
          color: theme === THEME_TYPES.DARK ? 'white' : 'black',
          '&:hover': {
            backgroundColor: theme === THEME_TYPES.DARK ? '#555' : '#eee',
          },
        }),
        multiValue: (provided: any) => ({
          ...provided,
          backgroundColor: theme === THEME_TYPES.DARK ? '#555' : '#ddd',
        }),
        multiValueLabel: (provided: any) => ({
          ...provided,
          color: theme === THEME_TYPES.DARK ? 'white' : 'black',
        }),
        multiValueRemove: (provided: any) => ({
          ...provided,
          color: theme === THEME_TYPES.DARK ? 'white' : 'black',
          ':hover': {
            backgroundColor: theme === THEME_TYPES.DARK ? '#333' : '#bbb',
            color: theme === THEME_TYPES.DARK ? 'white' : 'black',
          },
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: theme === THEME_TYPES.DARK ? '#3a3a3a' : '#fff',
          color: theme === THEME_TYPES.DARK ? 'white' : 'black',
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: 'grey',
        }),
      };

    const dispatch = useDispatch()

    const genreOptions = [
        { value: 'аниме', label: 'аниме' },
        { value: 'биография', label: 'биография' },
        { value: 'боевик', label: 'боевик' },
        { value: 'вестерн', label: 'вестерн' },
        { value: 'военный', label: 'военный' },
        { value: 'детектив', label: 'детектив' },
        { value: 'детский', label: 'детский' },
        { value: 'документальный', label: 'документальный' },
        { value: 'драма', label: 'драма' },
        { value: 'игра', label: 'игра' },
        { value: 'история', label: 'история' },
        { value: 'комедия', label: 'комедия' },
        { value: 'концерт', label: 'концерт' },
        { value: 'короткометражка', label: 'короткометражка' },
        { value: 'криминал', label: 'криминал' },
        { value: 'мелодрама', label: 'мелодрама' },
        { value: 'музыка', label: 'музыка' },
        { value: 'мультфильм', label: 'мультфильм' },
        { value: 'мюзикл', label: 'мюзикл' },
        { value: 'новости', label: 'новости' },
        { value: 'приключения', label: 'приключения' },
        { value: 'семейный', label: 'семейный' },
        { value: 'спорт', label: 'спорт' },
        { value: 'триллер', label: 'триллер' },
        { value: 'ужасы', label: 'ужасы' },
        { value: 'фантастика', label: 'фантастика' },
        { value: 'фэнтези', label: 'фэнтези' },
      ];

    const  countryOption = [
            { value: "Австралия", "label": "Австралия" },
            { value: "Австрия", "label": "Австрия" },
            { value: "Аргентина", "label": "Аргентина" },
            { value: "Афганистан", "label": "Афганистан" },
            { value: "Бангладеш", "label": "Бангладеш" },
            { value: "Беларусь", "label": "Беларусь" },
            { value: "Бельгия", "label": "Бельгия" },
            { value: "Болгария", "label": "Болгария" },
            { value: "Бразилия", "label": "Бразилия" },
            { value: "Великобритания", "label": "Великобритания" },
            { value: "Венгрия", "label": "Венгрия" },
            { value: "Венесуэла", "label": "Венесуэла" },
            { value: "Вьетнам", "label": "Вьетнам" },
            { value: "Германия", "label": "Германия" },
            { value: "Гонконг", "label": "Гонконг" },
            { value: "Греция", "label": "Греция" },
            { value: "Дания", "label": "Дания" },
            {value: "Египет", "label": "Египет" },
            { value: "Израиль", "label": "Израиль" },
            { value: "Индия", "label": "Индия" },
            { value: "Индонезия", "label": "Индонезия" },
            { value: "Ирландия", "label": "Ирландия" },
            { value: "Испания", "label": "Испания" },
            { value: "Италия", "label": "Италия" },
            { value: "Канада", "label": "Канада" },
            { value: "Китай", "label": "Китай" },
            { value: "Корея", "label": "Корея" },
            { value: "Мексика", "label": "Мексика" },
            { value: "Нидерланды", "label": "Нидерланды" },
            { value: "Норвегия", "label": "Норвегия" },
            { value: "Польша", "label": "Польша" },
            { value: "Португалия", "label": "Португалия" },
            { value: "Россия", "label": "Россия" },
            { value: "Румыния", "label": "Румыния" },
            { value: "СССР", "label": "СССР" },
            { value: "США", "label": "США" },
            { value: "Украина", "label": "Украина" },
            { value: "Франция", "label": "Франция" },
            { value: "Хорватия", "label": "Хорватия" },
            { value: "Чехия", "label": "Чехия" },
            { value: "Швейцария", "label": "Швейцария" },
            { value: "Швеция", "label": "Швеция" },
            { value: "Япония", "label": "Япония" },
          
    ];
    
  
    const [selectedOption, setSelectedOption] = useState('year');
    const [nameState, setNameState] = useState("")
    const [selectedGenres, setSelectedGenres] = useState<{ value: string; label: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string }[]>([]);

    const [yearStateFrom, setYearStateFrom] = useState("")
    const [yearStateTo, setYearStateTo] = useState("")


    const [ratingStateFrom, setRatingStateFrom] = useState("")
    const [ratingStateTo, setRatingStateTo] = useState("")


    const handleOptionChange = (event: any) => {
      setSelectedOption(event.target.value);
    };

    const handleGenreChange = (selectedOptions: any) => {
        setSelectedGenres(selectedOptions);
      };

      const handleCountryChange = (selectedOptions: any) => {
        setSelectedCountry(selectedOptions);
      };

      const searchClick = ({limit, page, sortField, sortType, genre, yearStateFrom, yearStateTo, ratingStateFrom, ratingStateTo, country}: any) =>{
        console.log(limit, page, sortField, sortType, genre, yearStateFrom, yearStateTo, ratingStateFrom, ratingStateTo, country);
        dispatch(loadMovies({limit, page, sortField, sortType, genre, yearStateFrom, yearStateTo, ratingStateFrom, ratingStateTo, country}))
      }

      
    return(
        <div className="filtersBlock">
            <div className="filterBlockTitle">
                 <h1 className="titleFilters">Filters</h1>
                 <button className="closeFiltersBtn" onClick={(e: any) => dispatch(setFiltersState(false))}>X</button>
            </div>
           
            <h3 className="h3Filters">Sort by</h3>
            <div className="sort-options">
            <input 
                type="radio"
                id="sort-rating"
                name="sort-option"
                value="rating.imdb"
                className="sort-option"
                checked={selectedOption === 'rating.imdb'}
                onChange={handleOptionChange}
            />
            <label htmlFor="sort-rating" className="sort-option-label">
                Rating
            </label>

            <input
                type="radio"
                id="sort-year"
                name="sort-option"
                value="year"
                className="sort-option"
                checked={selectedOption === 'year'}
                onChange={handleOptionChange}
            />
            <label htmlFor="sort-year" className="sort-option-label">
                Year
            </label>
            </div>
            <h3 className="h3Filters">Full or short movie name</h3>
            <input className="settings-input" type="text"  placeholder="Your text"/>
            <h3 className="h3Filters">Genre</h3>
            <Select
                isMulti
                name="genres"
                options={genreOptions}
                className="multi-select"
                classNamePrefix="select"
                placeholder="Your genre"
                value={selectedGenres}
                onChange={handleGenreChange}
                styles={customStyles}
            />
            <h3 className="h3Filters">Years</h3>
            <div className="input-cont">
                <input value={yearStateFrom} onChange={(e:any) => setYearStateFrom(e.target.value)} className="settings-input" style={{width:"41%"}} type="text"  placeholder="From"/>
                <input value={yearStateTo} onChange={(e:any) => setYearStateTo(e.target.value)} className="settings-input" style={{width:"41%"}} type="text"  placeholder="To"/>
            </div>
           
            <h3 className="h3Filters">Rating</h3>
            <div className="input-cont">
                <input  value={ratingStateFrom} onChange={(e:any) => setRatingStateFrom(e.target.value)}  className="settings-input" style={{width:"41%"}} type="text"  placeholder="From"/>
                <input value={ratingStateTo} onChange={(e:any) => setRatingStateTo(e.target.value)}  className="settings-input" style={{width:"41%"}} type="text"  placeholder="To"/>
            </div>
           
            <h3 className="h3Filters">Country</h3>
            <Select
                isMulti
                name="genres"
                options={countryOption}
                className="multi-select"
                classNamePrefix="select"
                placeholder="Select country"
                value={selectedCountry}
                onChange={handleCountryChange}
                styles={customStyles}
                menuPlacement="top"
            />
            <div className="filtersBtnContainer">
                <button 
                onClick = {() => {
                    setSelectedGenres([])
                    setSelectedCountry([])
                    setYearStateFrom("")
                    setYearStateTo("")
                    setRatingStateFrom("")
                    setRatingStateTo("")
                }}
                className="filtersBtn grey">Clear filter</button>
                <button
                onClick={() => searchClick({limit: 250, page: 1, sortField: selectedOption, sortType: -1, genre: selectedGenres,
                    yearStateFrom,  yearStateTo, ratingStateFrom, ratingStateTo, country: selectedCountry})}
                className="filtersBtn purple">Show results</button>
            </div>
        </div>
    )
}

export { Filters }