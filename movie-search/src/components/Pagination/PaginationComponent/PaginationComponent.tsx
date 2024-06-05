import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { IStoreState, THEME_TYPES } from '../../../types';
import { setPage } from '../../../redux/actionCreaters/moviesActionCreators';
import { useLocation } from 'react-router-dom';

const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { page, pages } = useSelector((state: IStoreState) => state.movies);
  const theme = useSelector((state: IStoreState) => state.ui.theme)
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [page]);

  const handleChange = (event: any, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 20px 0' }}>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        color="primary"

        sx={ theme === THEME_TYPES.LIGHT ? {
          '& .MuiPaginationItem-root': {
            backgroundColor: 'transparent',
            color: 'black',
            '&:hover': {
              backgroundColor: '#AFB2B6',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(175, 178, 182, 0.5)',
              fontWeight: 'bold',
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
            },
          },
        }
    : {
        '& .MuiPaginationItem-root': {
          backgroundColor: 'rgba(175, 178, 182, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: '#AFB2B6',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(175, 178, 182)',
            fontWeight: 'bold',
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      }}
      />
    </div>
  );
};

export { PaginationComponent };
