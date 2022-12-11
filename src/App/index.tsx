import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SeventeenJack } from '../Pages/SeventeenJack';
import Home from '../Pages/Home';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/SeventeenJack`} element={<SeventeenJack />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
