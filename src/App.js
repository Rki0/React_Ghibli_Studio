import { useState, useEffect, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Kuros from "./components/Kuros";
import MovieList from "./components/MovieList";
import Axios from "./axios/Axios";

function App() {
  // "homepage": "https://Rki0.github.io/React_Ghibli_Studio/"
  const { movie, setMovie } = Axios();

  // 스크롤 시 로고가 커지는 동작 구현
  // 스크롤 값을 가져오기 위한 ref 설정
  const divRef = useRef(null);

  // 스크롤 값을 저장하기 위한 변수 설정
  // width를 변화시킬 때 사용할 변수
  const [scrollTop, setScrollTop] = useState(null);

  // top을 변화시킬 때 사용할 변수
  const [scrollForTop, setScrollForTop] = useState(null);

  // Kuros 컴포넌트에 전달하기 위한 변수
  const [kuroTop, setKuroTop] = useState(null);

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
    if (positiveTop > 0 && positiveTop < 780) {
      setScrollForTop(positiveTop);
    }

    if (positiveTop > 0 && positiveTop < 920) {
      setKuroTop(positiveTop);
    }
  };

  // 영화 제목 표시 언어 선택
  // 0 : KR, 1 : JP, 2 : ENG
  const [lang, setLang] = useState(1);

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
          src={process.env.PUBLIC_URL + "/assets/Ghibli_Logo.png"}
          alt="logo"
          scrollTop={scrollTop}
        />
      </LogoWrapper>

      <MovieList
        movie={movie}
        setMovie={setMovie}
        lang={lang}
        setLang={setLang}
      />

      <Kuros kuroTop={kuroTop} />
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
  margin-bottom: 305px;
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
