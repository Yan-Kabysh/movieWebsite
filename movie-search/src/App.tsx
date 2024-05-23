import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FavoritesPage, Header, MainLogo, MainPage, Menu, Movies, SettingsPage, TrendsPage } from './components';

const  App = () => {
  return (
   <>
        <Routes>
          <Route path='/'>
            <Route path='movies'>
              <Route path='home' element={<MainPage/>}></Route>
              <Route path='trends' element={<TrendsPage/>}></Route>
              <Route path='favorites' element={<FavoritesPage/>}></Route>
              <Route path='settings' element={<SettingsPage/>}></Route>

            </Route>

          </Route>

        </Routes>
   </>
  )
}

export default App;
