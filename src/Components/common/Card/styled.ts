import styled from 'styled-components';

type CardWrapProps = {
  isSelected?: boolean;
  enemy?: boolean;
};

export const StyledCardWrap = styled.div<CardWrapProps>`
  ${(props) => props.isSelected && `opacity: 0.4;`}
`;

export const StyledCardImg = styled.img<CardWrapProps>`
  ${(props) => props.enemy && `width: 50px;`}
`;
