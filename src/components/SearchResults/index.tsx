import React from "react";
import { Text } from "react-native";

import { GameProps } from "../../types/Game";
import GameResultCard from "../GameResultCard";

import notFound from "../../assets/not-found.png";

import { Container, NotFound, NotFoundImage } from "./styles";
interface SearchProps {
  games: GameProps[];
}

function SearchResults({ games }: SearchProps) {
  return (
    <Container>
      {games.length > 0 ? (
        games.map((game) => <GameResultCard game={game} key={game.id} />)
      ) : (
        <>
          <NotFoundImage source={notFound} resizeMode="contain" />
          <NotFound>Couldn't find any matches{"\n"} to the search :c</NotFound>
        </>
      )}
    </Container>
  );
}

export default SearchResults;
