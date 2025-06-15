import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import View from './app/view';

const AppRoute: FC = () => (
  <BrowserRouter basename="/ecology">
    <Routes>
        <Route path="/" element={<View/>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoute;
