import React, { useState, useEffect, useRef } from "react";
import { createGlobalStyle } from "styled-components";

import Kuros from "./components/Kuros";
import MovieList from "./components/MovieList";
import MainBanner from "./components/MainBanner";
import MainDiv from "./components/MainDiv";
import Logo from "./components/Logo";
import Floor from "./components/Floor";

function App() {
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

  return (
    <React.Fragment>
      <MainDiv ref={divRef}>
        <GlobalStyle />

        <MainBanner />

        <Logo scrollForTop={scrollForTop} scrollTop={scrollTop} />

        <>
          <MovieList />
        </>

        <Kuros kuroTop={kuroTop} />

        <Floor />
      </MainDiv>
    </React.Fragment>
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
