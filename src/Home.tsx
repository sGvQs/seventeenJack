import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div>
        <img
          src="/src/assets/johnny_automatic_card_trick.svg"
          alt=""
          style={{ height: '30vh' }}
        />
      </div>
      <div className="neon" style={{ margin: '20px 0 0 0' }}>
        JACK STUDIOS
      </div>
      <div style={{ margin: '60px 0 0 0' }}>
        <Link to={`/SeventeenJack`}>
          <button className="button">SEVENTEEN JACK</button>
        </Link>
        <Link to={`/`} className="right-content">
          <button className="button">COMING SOON...</button>
        </Link>
        <Link to={`/`} className="right-content">
          <button className="button">COMING SOON...</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
