import { Dimensions } from "react-native";
import styled from "styled-components/native";

const DEVICE_WIDTH = Dimensions.get("window").width;

export const Container = styled.View`
  margin-bottom: 60px;
  align-items: center;
  padding: 0 24px;
`;

export const NotFoundImage = styled.Image`
  width: ${DEVICE_WIDTH * 0.8}px;
  height: ${DEVICE_WIDTH * 0.6}px;
  margin-top: 24px;
`;

export const NotFound = styled.Text`
  font-size: 20px;
  line-height: 24px
  text-align: center;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.primary};
`;
