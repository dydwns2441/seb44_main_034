import { styled } from 'styled-components';
import { COLOR_1 } from '../common';
import { FONT_SIZE_1 } from '../common';

export type ButtonType = {
  width?: string;
  height?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  color?: string;
  hoverable?: boolean;
  backgroundcolor?: string;
};

export const ConfirmBtn = styled.button`
  width: 100px;
  min-width: 100px;
  height: 30px;
  padding: 1%;
  margin: 2%;
  border: none;
  border-radius: 20px;
  background-color: ${COLOR_1.ivory};
  font-size: ${FONT_SIZE_1.normal_2};
  color: ${COLOR_1.dark_brown};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 4px 4px 2px ${COLOR_1.green};
  &:hover {
    background-color: ${COLOR_1.light_green};
    cursor: pointer;
  }
  &:active {
    background-color: ${COLOR_1.green};
    transform: translateY(4px);
    box-shadow: none;
    cursor: pointer;
  }
`;

export const CancelButton = styled(ConfirmBtn)`
  width: 60px;
  min-width: 60px;
  font-size: ${FONT_SIZE_1.normal_1};
  background-color: ${COLOR_1.light_gray};
  box-shadow: 2px 4px 4px 2px gray;
  &:hover {
    background-color: ${COLOR_1.light_gray};
    cursor: pointer;
  }
  &:active {
    background-color: gray;
  }
`;
