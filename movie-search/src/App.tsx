import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { FavoritesPage, Header, MainLogo, MainPage, Menu, NewPassword, ResetPassword, SearchPage, SelectedMovie, SelectedMoviePage, SettingsPage, SignIn, SignUp, TrendsPage } from './components';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import './global.css';
import { setTheme } from './redux/actionCreaters/uiActionCreaters';
import { setUser } from './redux/actionCreaters/userActionCreators';
import { THEME_TYPES, IStoreState } from './types';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IStoreState) => state.user.user);
  const data = localStorage.getItem("user");
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (localStorage.getItem("user")) {
      const data = localStorage.getItem("user")!;
      dispatch(setUser(JSON.parse(data)));
    }
    if (savedTheme === THEME_TYPES.DARK) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]);

  console.log(user)

  return (
    <>
      <Routes>
        <Route path='/' element={data ? <Navigate to="/movies/home" /> : <Navigate to="/signin" />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='reset' element={<ResetPassword />} />
        <Route path='newpassword' element={data ? <NewPassword /> : <Navigate to="/signin" />} />
        <Route path='movies'>
          <Route path='home' element={data ? <MainPage /> : <Navigate to="/signin" />} />
          <Route path='trends' element={data ? <TrendsPage /> : <Navigate to="/signin" />} />
          <Route path='favorites' element={data ? <FavoritesPage /> : <Navigate to="/signin" />} />
          <Route path='settings' element={data ? <SettingsPage /> : <Navigate to="/signin" />} />
          <Route path=':id' element={data ? <SelectedMoviePage /> : <Navigate to="/signin" />} />
          <Route path='search' element={data ? <SearchPage /> : <Navigate to="/signin" />} />
        </Route>
      </Routes>
      <ModalWindow />
    </>
  );
}

export default App;
