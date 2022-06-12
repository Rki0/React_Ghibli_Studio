import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled, { keyframes, css, createGlobalStyle } from "styled-components";

function App() {
  // 받아온 영화 데이터를 저장하기 위한 빈 배열
  const [movie, setMovie] = useState([]);

  // 첫 렌더링 될 때, 데이터 get
  useEffect(() => {
    axios
      .get("https://ghibliapi.herokuapp.com/films")
      .then((res) => setMovie(res.data))
      .catch((e) => console.log("error", e));
  }, []);

  console.log("movie list", movie);

  // 상영 시간을 시/분 단위로 계산
  function runningTime(runtime) {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;

    const runTime = `${hour}시간 ${min}분`;

    return runTime;
  }

  // 정렬 구현
  // 정렬된 값들을 저장하기 위한 빈 배열
  let sortedScore = [];

  function bestScore(movie) {
    movie.map((item) => {
      // 영화의 rt_score와 id로 구성된 object를 빈 배열에 저장
      // rt_score만 저장하면 어떤 영화의 값인지 모르기 때문에, 구분하기 위한 id가 필요
      const forSort = { rt_score: item.rt_score, id: item.id };
      sortedScore.push(forSort);

      // rt_score를 내림차순(큰 점수부터) 정렬
      sortedScore.sort((a, b) => {
        return b.rt_score - a.rt_score;
      });
    });
  }

  bestScore(movie);
  console.log("sorted", sortedScore);

  // 스크롤 시 로고가 커지는 동작 구현
  // 스크롤 값을 가져오기 위한 ref 설정
  const divRef = useRef(null);

  // 스크롤 값을 저장하기 위한 변수 설정
  // width를 변화시킬 때 사용할 변수
  const [scrollTop, setScrollTop] = useState(null);

  // top을 변화시킬 때 사용할 변수
  const [scrollForTop, setScrollForTop] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleLogo);

    return () => {
      window.removeEventListener("scroll", handleLogo);
    };
  });

  const handleLogo = () => {
    const scroll = divRef.current.getBoundingClientRect();

    // getBoundingClientRect()에서 얻은 top은 음수이므로, 사용하기 편하게 -1을 곱함.
    const positiveTop = scroll.top * -1;

    // scroll.top의 범위를 제한하지 않으면 styled-components에서 width가 작아졌다가 다시 커져버리므로(음수로 확대되는 것 때문에 그런듯)
    // 원하는 범위에서만 setState가 되도록 설정
    // 최대값 설정을 min-width랑 계산해서 설정해야함
    if (positiveTop > 0 && positiveTop < 500) {
      setScrollTop(positiveTop);
    }

    // 원하는 범위에서만 setState가 되도록 설정
    // 얼만큼 내려갈지 고려해서 계산해야함
    if (positiveTop > 0 && positiveTop < 700) {
      setScrollForTop(positiveTop);
    }
  };

  return (
    <TopDiv ref={divRef}>
      <GlobalStyle />
      <MainBanner>
        <BannerImg
          src="https://ghibli-park.jp/site/img/index/main3.jpg"
          alt="banner"
        />
      </MainBanner>

      <LogoWrapper scrollForTop={scrollForTop}>
        <LogoImg
          src={process.env.PUBLIC_URL + "assets/Ghibli_Logo.png"}
          alt="logo"
          scrollTop={scrollTop}
        />
      </LogoWrapper>

      <MovieWrapperDiv>
        {movie.map((item) => {
          return (
            <MovieDiv>
              <h2>{item.original_title}</h2>
              <MovieImg src={item.image} alt="movie" />
              <p>감독 : {item.director}</p>
              <p>프로듀서 : {item.producer}</p>
              <p>개봉 년도 : {item.release_date}년</p>
              <p>
                상영 시간 : {item.running_time}분(
                {runningTime(item.running_time)})
              </p>
            </MovieDiv>
          );
        })}
      </MovieWrapperDiv>
    </TopDiv>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-family: 'Kiwi Maru', serif;
  }

  html::-webkit-scrollbar {
    display: none;
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MainBanner = styled.div`
  margin-bottom: 225px;
`;

const BannerImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const ShowLogo = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: ${(props) => `${props.scrollForTop}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  animation: ${ShowLogo} 1000ms ease-in-out;
`;

const LogoImg = styled.img`
  display: block;
  min-width: 500px;
  max-width: 1000px;
  width: ${(props) => `${1000 - props.scrollTop}px`};
  height: auto;
`;

const MovieWrapperDiv = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  // justify-content: center;
  justify-content: space-around;
`;

const MovieDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
  height: auto;
  // box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
  //   rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  box-shadow: #d2c47f 0px 4px 8px -2px, #d2c47f 0px 0px 0px 1px;
  // border: 1px solid black;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 10px 0;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

const MovieImg = styled.img`
  display: block;
  width: 250px;
  height: auto;
  margin-bottom: 10px;
`;
