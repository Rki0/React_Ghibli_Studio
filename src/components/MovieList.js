import styled from "styled-components";
import LangToggleBtn from "./LangToggleBtn";
import SortBtn from "./SortBtn";

function MovieList({ movie, lang, setMovie, setLang }) {
  // 상영 시간을 시/분 단위로 계산
  function runningTime(runtime) {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;

    const runTime = `${hour}시간 ${min}분`;

    return runTime;
  }

  // KR 영화 제목 배열
  // 문제 발생! 배열을 이렇게 따로 만들어서 사용하면 movie 배열이랑 따로 놀기 때문에, 한국어로 전환 후 정렬하면
  // 제목은 순서 변경이 안되는 현상 발생..
  // const krTitle = [
  //   "천공의 성 라퓨타",
  //   "반딧불이의 묘",
  //   "이웃집 토토로",
  //   "마녀 배달부 키키",
  //   "추억은 방울방울",
  //   "붉은 돼지",
  //   "폼포코 너구리 대작전",
  //   "귀를 기울이면",
  //   "모노노케 히메",
  //   "이웃집 야마다군",
  //   "센과 치히로의 행방불명",
  //   "고양이의 보은",
  //   "하울의 움직이는 성",
  //   "게드전기: 어스시의 전설",
  //   "벼랑 위의 포뇨",
  //   "마루 밑 아리에티",
  //   "코쿠리코 언덕에서",
  //   "바람이 분다",
  //   "가구야 공주 이야기",
  //   "추억의 마니",
  //   "붉은 거북",
  //   "아야와 마녀",
  // ];

  return (
    <MovieWrapperDiv>
      <LangToggleBtn setLang={setLang} />

      <SortBtn movie={movie} setMovie={setMovie} />

      {movie.map((item, index) => {
        return (
          <MovieDiv key={index}>
            {/* 컴포넌트를 바깥에 넣고 내용물을 삼항연산자 처리하면, 컴포넌트 자체는 공간을 차지하기 때문에 lang이 증가할 수록 위치가 점점 아래로 옮겨감 */}
            {/* 따라서 컴포넌트까지도 삼항연산자에 넣어줘야 같은 위치에서 글자만 바뀜 */}
            {/* <MovieTitle>{lang === 0 ? item.kr_title : null}</MovieTitle>
            <MovieTitle>{lang === 1 ? item.original_title : null}</MovieTitle>
            <MovieTitle>{lang === 2 ? item.title : null}</MovieTitle> */}

            {lang === 0 ? <MovieTitle>{item.kr_title}</MovieTitle> : null}
            {lang === 1 ? <MovieTitle>{item.original_title}</MovieTitle> : null}
            {lang === 2 ? <MovieTitle>{item.title}</MovieTitle> : null}

            <MovieImg src={item.image} alt="movie" />
            <p>감독 : {item.director}</p>
            <p>프로듀서 : {item.producer}</p>
            <p>개봉 년도 : {item.release_date}년</p>
            <p>
              상영 시간 : {item.running_time}분(
              {runningTime(item.running_time)})
            </p>
            <p>평점: {item.rt_score}</p>
            {/* <MovieImg src={item.movie_banner} alt="movie" /> */}
          </MovieDiv>
        );
      })}
    </MovieWrapperDiv>
  );
}

export default MovieList;

const MovieWrapperDiv = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-around;
  background: linear-gradient(white, #d2c47f);
`;

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
