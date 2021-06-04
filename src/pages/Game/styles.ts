import styled from "styled-components/native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { transparentize } from "polished";

export const Container = styled.ScrollView`
  background: ${(props) => props.theme.colors.background};
  flex: 1;
  height: 100%;
`;

export const Header = styled.ImageBackground`
  padding: ${Constants.statusBarHeight + 30}px 24px 0;
  width: 100%;
  height: 360px;

  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderButtonWrapper = styled(BlurView)`
  width: 48px;
  height: 48px;
  border-radius: 16px;

  justify-content: center;
  align-items: center;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 16px;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  padding: 0 24px;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
`;

export const Console = styled.Text`
  padding-top: 24px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 14px;
`;

export const Name = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 32px;
  margin-bottom: 24px;
`;

export const Description = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.text};
  font-size: 14px;
  margin-bottom: 24px;
`;

export const AddButton = styled(RectButton)`
  background: ${(props) => props.theme.colors.primary};
  height: 56px;
  border-radius: 16px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
`;

export const AddButtonText = styled.Text`
  color: #f6f5fa;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
`;
interface IconProps {
  active: boolean;
}

export const Icon = styled(Feather)<IconProps>`
  color: ${(props) => (props.active ? props.theme.colors.primary : "#F6F5FA")};
`;

export const ModalTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.text};
`;

export const ListsButtonsWrapper = styled.View`
  margin: 36px 0 24px;
  border-radius: 16px;

  overflow: hidden;
  border: 3px solid ${(props) => props.theme.colors.lightText};
`;

export const ListButtonsRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface ListButtonProps {
  selected: boolean;
  size: string;
}

export const ListButton = styled(RectButton)<ListButtonProps>`
  width: ${(props) => (props.size === "small" ? "50%" : "100%")};
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.selected
      ? props.theme.colors.lightText
      : props.theme.colors.background};
`;

interface ListButtonTextProps {
  selected: boolean;
}

export const ListButtonText = styled.Text<ListButtonTextProps>`
  text-align: center;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) =>
    props.selected ? props.theme.colors.background : props.theme.colors.text};
`;

export const Loading = styled.View`
  background: ${(props) => transparentize(0.2, props.theme.colors.background)};
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;

  align-items: center;
  justify-content: center;
`;
