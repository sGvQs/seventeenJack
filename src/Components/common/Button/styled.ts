import React from 'react';
import styled from 'styled-components';
import { Button } from '.';

export const StyledButton = styled.button<{ rightContent: boolean }>`
  ${(props) => props.rightContent && `margin-left: 20px;`}
  padding: 10px 15px 10px 15px;
  filter: drop-shadow(0 0 0.7rem #f40a35);
  background-color: #f40a35;
  color: #fed128;
  font-size: 13px;
  font-weight: 900;
  font-family: YohaKutoJP, 'Hiragino Sans', 'Yu Gothic', YuGothic, sans-serif;
  -webkit-filter: drop-shadow(0 0 0.7rem #f40a35);
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;

  :hover {
    text-shadow: 0 0 1vw #fa1c16, 0 0 3vw #fa1c16, 0 0 10vw #fa1c16,
      0 0 10vw #fa1c16, 0 0 0.4vw #fed128;
  }

  @media screen and (max-width: 800px) {
    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #b8b8b8;
      cursor: pointer;
      transition: border-color 0.25s;
    }

    .button:hover {
      text-shadow: none;
    }
  }
`;
