import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

// Always you are going to style a
// component out side the React,
// you must use () around the component
//
// For standard all the elements have
// display: flex
export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
  flex: 1;
  text-align: center;
`;
