import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { FavoritesPage, Header, MainLogo, MainPage, Menu, Movies, SelectedMovie, SelectedMoviePage, SettingsPage, TrendsPage } from './components';
import './global.css';
import { setTheme } from './redux/actionCreaters/uiActionCreaters';
import { THEME_TYPES } from './types';
const  App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === THEME_TYPES.DARK) {
      dispatch(setTheme(savedTheme));
    }
  }, []);
  
  return (
   <>
        <Routes>
          <Route path='/'>
            <Route path='movies'>
              <Route path='home' element={<MainPage/>}></Route>
              <Route path='trends' element={<TrendsPage/>}></Route>
              <Route path='favorites' element={<FavoritesPage/>}></Route>
              <Route path='settings' element={<SettingsPage/>}></Route>
              <Route path=":id" element={<SelectedMoviePage/>}/>

            </Route>

          </Route>

        </Routes>
   </>
  )
}

export default App;
