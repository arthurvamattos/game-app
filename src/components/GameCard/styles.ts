import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Game = styled(RectButton)`
  background: ${(props) => props.theme.colors.foreground};
  margin: 0 24px 12px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  padding: 12px;
`;

export const GameImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 12px;
`;

export const GameDetails = styled.View`
  margin-left: 12px;
`;

export const Console = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 12px; ;
`;

export const GameName = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 16px;
`;

export const GameYear = styled.Text`
  color: ${(props) => props.theme.colors.lightText};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 12px;
  margin-left: auto;
`;

export const DeleteGameButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  background: ${(props) => props.theme.colors.primary};
  width: 87px;
  height: 87px;
  border-radius: 16px;
  right: 24px;
  z-index: 5;

  align-items: center;
  justify-content: center;
`;

export const DeleteGameButtonComplement = styled.View`
  background: ${(props) => props.theme.colors.primary};
  width: 36px;
  height: 87px;
  left: -40px;
  bottom: 87px;
  z-index: 4;

  align-items: center;
  justify-content: center;
`;
