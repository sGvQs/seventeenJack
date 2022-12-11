import styled from 'styled-components';

export const StyledNeon = styled.div`
  @font-face {
    font-family: neon;
    src: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/707108/neon.ttf);
  }
  text-align: center;
  font-family: neon;
  color: #fb4264;
  font-size: 50px;
  line-height: 9vw;
  text-shadow: 0 0 3vw #f40a35;
  animation: neon 10s linear infinite;
  -moz-animation: neon 10s linear infinite;
  -webkit-animation: neon 10s linear infinite;
  -o-animation: neon 10s linear infinite;

  @keyframes neon {
    0%,
    100% {
      text-shadow: 0 0 1vw #fa1c16, 0 0 3vw #fa1c16, 0 0 10vw #fa1c16,
        0 0 10vw #fa1c16, 0 0 0.4vw #fed128, 0.5vw 0.5vw 0.1vw #806914;
      color: #fed128;
    }
    50% {
      text-shadow: 0 0 0.5vw #800e0b, 0 0 1.5vw #800e0b, 0 0 5vw #800e0b,
        0 0 5vw #800e0b, 0 0 0.2vw #800e0b, 0.5vw 0.5vw 0.1vw #40340a;
      color: #806914;
    }
  }
`;
