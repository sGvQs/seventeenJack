import { Link } from 'react-router-dom';
import { Button } from '../../Components/common/Button';
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
          <Button label={'SEVENTEENJACK'} rightContent={false} />
        </Link>
        <Link to={`/`} className="right-content not-firstchild">
          <Button label={'COMMING SOON...'} rightContent={true} />
        </Link>
        <Link to={`/`} className="right-content not-firstchild">
          <Button label={'COMMING SOON...'} rightContent={true} />
        </Link>
      </div>
    </>
  );
};

export default Home;
