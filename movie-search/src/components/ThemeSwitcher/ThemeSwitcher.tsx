import "./ThemeSwitcher.css"

const ThemeSwitcher = ({onClick}: any) => {
    return(
        <div className="container">
            <input className="inputToggle" type="checkbox" id="check"  onClick={onClick} />
            <label htmlFor="check" className="themeToggle"></label>
        </div>
    )
}

export { ThemeSwitcher }
