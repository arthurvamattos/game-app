import { Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");
export const OVERFLOW_HEIGHT = 70;
export const ITEM_WIDTH = width * 0.76;
export const ITEM_HEIGHT = ITEM_WIDTH * 1.1;
const DEVICE_WIDTH = Dimensions.get("window").width;

export const Wrapper = styled.View`
  flex: 1;
`;

export const TextWrapper = styled.View`
  padding: 0 24px;
  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 14px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 32px;
`;

export const FavoriteWrapper = styled(RectButton)`
  overflow: hidden;
  border-radius: 8px;
`;

export const FavoriteImage = styled.ImageBackground`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
`;

export const HeadersWrapper = styled(Animated.View)`
  padding: 0 24px;
  height: ${OVERFLOW_HEIGHT}px;
  overflow: hidden;
`;

export const Header = styled.View`
  height: ${OVERFLOW_HEIGHT}px;
`;

export const GameTitle = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.text};
`;

export const GameYear = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.lightText};
`;

export const NoFavoritesImage = styled.Image`
  width: ${DEVICE_WIDTH * 0.8}px;
  height: ${DEVICE_WIDTH * 0.6}px;
  margin-top: 24px;
  align-self: center;
  margin-bottom: 16px;
`;

export const NoFavorites = styled.Text`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.primary};
`;
