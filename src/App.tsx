import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import SeventeenJack from './SeventeenJack';
import Home from './Home';

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
