import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border-radius: 10px;
  height: 56px;
  border: 0;
  background: #ff9000;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  /*-webkit-text-fill-color: #fff;
      transition: background-color 5000s ease-in-out 0s;*/
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
