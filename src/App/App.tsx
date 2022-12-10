import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SeventeenJack } from '../Pages/SeventeenJack';
import Home from '../Pages/Home';

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
