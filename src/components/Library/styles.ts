import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex: 1;
  margin-bottom: 60px;
  padding-bottom: 24px;
`;

export const CategoryList = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 8, paddingRight: 24 },
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  margin-bottom: 24px;
`;

interface ItemProps {
  active: boolean;
}

export const CategoryItem = styled.TouchableOpacity<ItemProps>`
  padding: 6px 16px;
  margin-left: 16px;

  border-radius: 32px;
  border-width: 2px;
  border-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.foreground};

  background: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.background};

  align-items: center;
  justify-content: center;
`;

export const CategoryName = styled.Text<ItemProps>`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.heading};

  color: ${(props) => (props.active ? "#fff" : props.theme.colors.text)};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 32px;
  margin: 12px 24px 24px;
`;
