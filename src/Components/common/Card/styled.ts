import styled from 'styled-components';

type CardWrapProps = {
  isSelected?: boolean;
  enemy?: boolean;
};

export const StyledCardWrap = styled.div<CardWrapProps>`
  ${(props) => props.isSelected && `opacity: 0.4;`}
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
`;

export const StyledCardImg = styled.img<CardWrapProps>`
  ${(props) => props.enemy && `width: 50px;`}
  ${(props) => props.enemy === false && `width: 150px;`}
`;
