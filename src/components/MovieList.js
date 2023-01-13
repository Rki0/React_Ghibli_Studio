import React, { useState } from "react";
import styled from "styled-components";

import LangToggleBtn from "./LangToggleBtn";
import SortBtn from "./SortBtn";
import LoadData from "../LoadData";
import MovieItem from "./MovieItem";

const loadedMovie = LoadData();

function MovieList() {
  const [movie, setMovie] = useState(loadedMovie);

  // 영화 제목 표시 언어 선택
  // 0 : KR, 1 : JP, 2 : ENG
  const [lang, setLang] = useState(1);

  return (
    <MovieWrapperDiv>
      <LangToggleBtn setLang={setLang} />

      <SortBtn movie={movie} setMovie={setMovie} />

      {movie &&
        movie.map((item, index) => (
          <MovieItem key={index} item={item} lang={lang} />
        ))}
    </MovieWrapperDiv>
  );
}

export default React.memo(MovieList);

const MovieWrapperDiv = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-around;
  background: linear-gradient(white, #d2c47f);
`;
