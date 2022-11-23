import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SeventeenJack from '../Pages/SeventeenJack/SeventeenJack';
import Home from '../Pages/Home/Home';

function App() {
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
}

export default App;
