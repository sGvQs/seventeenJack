import styled from 'styled-components';
import { Play, Pause } from '@styled-icons/fa-solid';

export const StyledAudioContainer = styled.div`
  filter: drop-shadow(0 0 1rem crimson);
  background-color: #fa1c16;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  position: fixed;
  right: 50px;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-filter: drop-shadow(0 0 1rem crimson);
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 800px) {
    right: 20px;
    bottom: 20px;
  }
`;

export const StyledPlay = styled(Play)`
  height: 25px;
  path {
    fill: #fed128;
  }

  path:hover {
    stroke: #ffdf6c;
    stroke-width: 2px;
    stroke-linejoin: round;
    fill: #ffdf6c;
  }
`;

export const StyledPause = styled(Pause)`
  height: 25px;
  path {
    fill: #fed128;
  }

  path:hover {
    stroke: #ffdf6c;
    stroke-width: 2px;
    stroke-linejoin: round;
    fill: #ffdf6c;
  }
`;
