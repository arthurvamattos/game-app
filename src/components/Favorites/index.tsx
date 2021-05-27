import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, Animated } from "react-native";
import {
  Directions,
  FlingGestureHandler,
  State,
} from "react-native-gesture-handler";
import { GameProps } from "../../types/Game";

import {
  TextWrapper,
  SubTitle,
  Title,
  FavoriteWrapper,
  FavoriteImage,
  HeadersWrapper,
  Header,
  GameTitle,
  GameYear,
  Wrapper,
  OVERFLOW_HEIGHT,
  ITEM_WIDTH,
  ITEM_HEIGHT,
} from "./styles";

import fakeGames from "../../utils/fakeGames";
import { useNavigation } from "@react-navigation/core";
const VISIBLE_ITEMS = 3;

interface ItemProps {
  item: GameProps;
  index: number;
}

const AnimatedFavoriteWrapper =
  Animated.createAnimatedComponent(FavoriteWrapper);

const Favorites: React.FC = () => {
  const [index, setIndex] = useState(0);

  const navigation = useNavigation();

  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;

  const translateY = scrollXAnimated.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  }, []);

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  function handleGamePressed(game: GameProps) {
    navigation.navigate("Game", game);
  }

  const renderItem: React.FC<ItemProps> = ({ item, index }) => {
    const inputRange = [index - 1, index, index + 1];

    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [50, 0, -100],
    });

    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3],
    });

    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
    });

    return (
      <AnimatedFavoriteWrapper
        onPress={() => handleGamePressed(item)}
        style={{
          overflow: "hidden",
          position: "absolute",
          left: -ITEM_WIDTH / 2,
          transform: [{ translateX }, { scale }],
          opacity,
        }}
      >
        <FavoriteImage
          source={{
            uri: item.cover,
          }}
        />
      </AnimatedFavoriteWrapper>
    );
  };

  return (
    <Wrapper>
      <TextWrapper>
        <SubTitle>LIVE IN YOUR HEART</SubTitle>
        <Title>Favorites</Title>
      </TextWrapper>

      <HeadersWrapper>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {fakeGames.map((game) => (
            <Header key={game.id}>
              <GameTitle>{game.name}</GameTitle>
              <GameYear>{game.year}</GameYear>
            </Header>
          ))}
        </Animated.View>
      </HeadersWrapper>

      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (index === fakeGames.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}
        >
          <FlatList
            data={fakeGames}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderItem}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              height: ITEM_HEIGHT,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: fakeGames.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
          />
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Wrapper>
  );
};

export default Favorites;
