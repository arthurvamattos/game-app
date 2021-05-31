import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import api, { getGameQuery } from "../../services/api";
import { GameProps } from "../../types/Game";
import GameResultCard from "../GameResultCard";

import { Container, MinimumLettersNotice } from "./styles";

interface SearchProps {
  query: string;
}

interface ApiResponse {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  release_dates: [{ id: number; y: number }];
  name: string;
  platforms: [
    {
      id: number;
      name: string;
    }
  ];
  summary: string;
}

function SearchResults({ query }: SearchProps) {
  const [results, setResults] = useState<GameProps[]>([]);

  useEffect(() => {
    async function loadResults() {
      const response = await api.post<ApiResponse[]>(
        "https://api.igdb.com/v4/games",
        getGameQuery(query)
      );
      if (response.data) {
        const serializedGames = response.data.map((game) => {
          const cover = `https:${game.cover.url.replace("thumb", "1080p")}`;

          const platforms = game.platforms
            ? game.platforms.map((platform) => platform.name)
            : ["Not found"];

          return {
            id: String(game.id),
            name: game.name,
            summary: game.summary,
            rating: "95",
            aggregated_rating: "97",
            year: game.release_dates[0].y.toString(),
            cover: cover ? cover : "",
            platforms,
          };
        });

        setResults(serializedGames);
      }
    }

    if (query.length >= 3) {
      loadResults();
    }
  }, [query]);

  if (query.length < 3) {
    return (
      <MinimumLettersNotice>
        You must enter three letters before starting the search
      </MinimumLettersNotice>
    );
  }

  return (
    <Container>
      {results.length > 0 &&
        results.map((result) => <GameResultCard game={result} />)}
    </Container>
  );
}

export default SearchResults;
