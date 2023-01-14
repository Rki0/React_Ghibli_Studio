import React from "react";
import styled from "styled-components";

function MovieItem({ item, lang }) {
  // 상영 시간을 시/분 단위로 계산
  const runningTime = (runtime) => {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;

    const runTime = `${hour}시간 ${min}분`;

    return runTime;
  };

  return (
    <MovieDiv>
      {/* 컴포넌트를 바깥에 넣고 내용물을 삼항연산자 처리하면, 컴포넌트 자체는 공간을 차지하기 때문에 lang이 증가할 수록 위치가 점점 아래로 옮겨감 */}
      {/* 따라서 컴포넌트까지도 삼항연산자에 넣어줘야 같은 위치에서 글자만 바뀜 */}
      {/* <MovieTitle>{lang === 0 ? item.kr_title : null}</MovieTitle>
<MovieTitle>{lang === 1 ? item.original_title : null}</MovieTitle>
<MovieTitle>{lang === 2 ? item.title : null}</MovieTitle> */}

      {lang === 0 ? <MovieTitle>{item.kr_title}</MovieTitle> : null}
      {lang === 1 ? <MovieTitle>{item.hepburn}</MovieTitle> : null}
      {lang === 2 ? <MovieTitle>{item.title}</MovieTitle> : null}

      <MovieImg src={item.poster} alt="movie" />
      <p>감독 : {item.director}</p>
      <p>프로듀서 : {item.producers}</p>
      <p>개봉 시기 : {item.release ? `${item.release}` : "No Data"}</p>
      <p>
        상영 시간 :
        {item.runtimeMinutes
          ? `${item.runtimeMinutes}분(
  ${runningTime(item.runtimeMinutes)})`
          : "No Data"}
      </p>
      <p>평점: {item.reviews.imdb ? item.reviews.imdb : "No Data"}</p>
      <p>제작 예산: {item.budgetUSD ? `${item.budgetUSD} $` : "No Data"}</p>
      <p>수익: {item.boxOfficeUSD ? `${item.boxOfficeUSD} $` : "No Data"}</p>
    </MovieDiv>
  );
}

export default MovieItem;

const MovieDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
  height: auto;
  box-shadow: #283593 0px 4px 8px -2px, #283593 0px 0px 0px 1px;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 10px 0;

  p {
    margin: 0;
    text-align: center;
  }
`;

const MovieTitle = styled.h2`
  text-align: center;
  margin: 0 0 10px;
`;

const MovieImg = styled.img`
  display: block;
  width: 250px;
  height: auto;
  margin-bottom: 10px;
`;
