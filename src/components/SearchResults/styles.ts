import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 60px;
`;

export const MinimumLettersNotice = styled.Text`
  font-size: 16px;
  margin: 24px;
  text-align: center;
  line-height: 28px;

  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.text};
`;
