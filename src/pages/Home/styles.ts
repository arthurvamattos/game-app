import Constants from "expo-constants";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.ScrollView`
  padding-top: ${Constants.statusBarHeight + 30}px;
  background: ${(props) => props.theme.colors.background};
  flex: 1;

  padding-bottom: 50px;
`;

export const HeadingWrapper = styled.View`
  padding: 16px 24px;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const Heading = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.text};
  font-size: 22px;
`;

export const SubTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.text};
  color: ${(props) => props.theme.colors.text};
  font-size: 22px;
`;

export const ToggleTheme = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

export const Search = styled.View`
  background: ${(props) => props.theme.colors.foreground};
  border-radius: 16px;
  margin: 24px;
`;

export const SearchIcon = styled(Feather)`
  position: absolute;
  left: 12px;
  top: 12px;
`;

export const SearchInput = styled.TextInput`
  height: 48px;
  padding: 0 16px 0 48px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.text}; ;
`;
