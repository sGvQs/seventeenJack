import styled from 'styled-components';

export const StyledHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledJackImg = styled.img`
  height: 30vh;
`;

export const StyledButtonWrap = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
