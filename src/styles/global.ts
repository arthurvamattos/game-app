import { Dimensions } from "react-native";
import Constants from "expo-constants";
import styled from "styled-components/native";

const { height } = Dimensions.get("screen");

export const Container = styled.View`
  flex: 1;
  height: 100%;
  padding: 24px 0;
  padding-top: ${Constants.statusBarHeight + 30}px;
  min-height: ${height}px;
  background: ${(props) => props.theme.colors.background};
`;
