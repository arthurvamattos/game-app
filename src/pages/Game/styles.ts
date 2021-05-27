import styled from "styled-components/native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import { RectButton } from "react-native-gesture-handler";

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
  padding: 16px 24px 0;
  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  margin-top: -24px;
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

export const RateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RateWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RateTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 10px;
  margin-left: 8px;
`;

export const Rate = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 64px;
  margin-left: 8px;
  line-height: 64px;
`;

export const AddButton = styled(RectButton)`
  background: ${(props) => props.theme.colors.primary};
  height: 56px;
  margin: 24px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const AddButtonText = styled.Text`
  color: #f6f5fa;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
`;
