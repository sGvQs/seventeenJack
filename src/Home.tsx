import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      <div>
        <img
          src="/johnny_automatic_card_trick.svg"
          alt=""
          style={{ height: '30vh' }}
        />
      </div>
      <div className="neon" style={{ margin: '20px 0 0 0' }}>
        JACK STUDIOS
      </div>
      <div className="page-button-wrap">
        <Link to={`/SeventeenJack`}>
          <button className="button">SEVENTEEN JACK</button>
        </Link>
        <Link to={`/`} className="right-content not-firstchild">
          <button className="button">COMING SOON...</button>
        </Link>
        <Link to={`/`} className="right-content not-firstchild">
          <button className="button">COMING SOON...</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
