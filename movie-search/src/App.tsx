import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, MainLogo, Movies } from './components';

const  App = () => {
  return (
   <>
        <Routes>
          <Route path='/'>
            <Route path='movies' element={<Movies/>}/>

          </Route>

        </Routes>
   </>
  )
}

export default App;
