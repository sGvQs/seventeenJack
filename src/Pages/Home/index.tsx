import { Link } from 'react-router-dom';
import { Button } from '../../Components/common/Button';
import { Neon } from '../../Components/common/Neon';
import { StyledJackImg, StyledButtonWrap } from './styled';

const Home = () => {
  return (
    <>
      <StyledJackImg src="/johnny_automatic_card_trick.svg" />
      <Neon label={'JACK STUDIO'} />
      <StyledButtonWrap>
        <Link to={`/SeventeenJack`}>
          <Button label={'SEVENTEENJACK'} />
        </Link>
        <Link to={`/`} className="right-content not-firstchild">
          <Button label={'COMMING SOON...'} />
        </Link>
        <Link to={`/`} className="right-content not-firstchild">
          <Button label={'COMMING SOON...'} />
        </Link>
      </StyledButtonWrap>
    </>
  );
};

export default Home;
