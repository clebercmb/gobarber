import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid #232129;
  background: #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
    /*-webkit-text-fill-color: #fff;
      transition: background-color 5000s ease-in-out 0s;*/
  }

  > svg {
    margin-right: 16px;
  }
`;
