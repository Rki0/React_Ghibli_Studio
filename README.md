# ๐ฅ Ghibli Studio

API ํ์ฉ ์์ ๋ก ๋ง์ด ์ฐ์ด๋ ์ํ ์ถ์ฒ ์ฌ์ดํธ!  
ํ๋ฒํ๊ฒ ๋ง๋ค๊ธฐ๋ ์ซ๊ณ , ์ํ๋ฅผ ํฌ๊ฒ ์ข์ํ์ง ์๊ธฐ ๋๋ฌธ์ ํฅ๋ฏธ๋ ์์๋ค.  
๋จ, ์ง๋ธ๋ฆฌ๋ ์์ธ๋๊น..  
์ด๋ค ๋์์ธ์ ์ฐธ๊ณ ํ ๊น ๊ณ ๋ฏผ์ ํ๋ค. ๊ทธ๋ฌ๋ ์ค ์ผ๋ณธ์ ์๋ ์ง๋ธ๋ฆฌ ๊ณต์ ๊ณต์ ์ฌ์ดํธ๊ฐ ์๊ธธ๋ ๊ทธ ๊ฒ์ ์ฐธ๊ณ ํ๋ค.  
์ด๋ฏธ์ง๋ ์ ๋๋ฉ์ด์ ํจ๊ณผ ๋ฑ์ ๋ง์ด ์ฐธ๊ณ ํ๋ค.  
[์ง๋ธ๋ฆฌ ๊ณต์ ๊ณต์ ์ฌ์ดํธ](https://ghibli-park.jp/)

## ๐ ํ์ผ ๊ตฌ์กฐ

Link ๊ฐ์ Route ๊ด๋ จ ํ๊ทธ๋ ์ฌ์ฉํ์ง ์์๊ธฐ ๋๋ฌธ์ ๊ต์ฅํ ๊ฐ๋จํ๋ค.  
์ฌ์ง์ด CRUD ๊ธฐ๋ฅ๋ ํ์์์ด์ Redux๋ก ๋ฐ๋ก ์ฌ์ฉํ์ง ์์๋ค.

<img width="168" alt="แแณแแณแแตแซแแฃแบ 2022-06-22 แแฉแแฎ 1 51 53" src="https://user-images.githubusercontent.com/86224851/174946209-0b03079e-4326-427c-88db-1bf433fcb75f.png">
  
## ๐ src/App.js
์ด ๋ถ๋ถ์์ ๋์ฌ๊ฒจ ๋ณผ ๊ฒ์ scroll ์ด๋ฒคํธ์ ๋ฐ๋ฅธ ์ด๋ฏธ์ง ์์์ ํ๋, ์ถ์, ์ด๋์ด๋ค.  
ํฌ๊ฒ ์ค์ํ์ง ์์ ๋ถ๋ถ์ ์ญ์ ํ์ผ๋, ์๋ณธ ์ฝ๋์ ๋ค๋ฅด๋ค.  
  
```js
function App() {
  const { movie, setMovie } = Axios();

// ์คํฌ๋กค ์ ๋ก๊ณ ๊ฐ ์ปค์ง๋ ๋์ ๊ตฌํ
// ์คํฌ๋กค ๊ฐ์ ๊ฐ์ ธ์ค๊ธฐ ์ํ ref ์ค์ 
const divRef = useRef(null);

// ์คํฌ๋กค ๊ฐ์ ์ ์ฅํ๊ธฐ ์ํ ๋ณ์ ์ค์ 
// width๋ฅผ ๋ณํ์ํฌ ๋ ์ฌ์ฉํ  ๋ณ์
const [scrollTop, setScrollTop] = useState(null);

// top์ ๋ณํ์ํฌ ๋ ์ฌ์ฉํ  ๋ณ์
const [scrollForTop, setScrollForTop] = useState(null);

// Kuros ์ปดํฌ๋ํธ์ ์ ๋ฌํ๊ธฐ ์ํ ๋ณ์
const [kuroTop, setKuroTop] = useState(null);

useEffect(() => {
window.addEventListener("scroll", handleLogo);

    return () => {
      window.removeEventListener("scroll", handleLogo);
    };

});

const handleLogo = () => {
const scroll = divRef.current.getBoundingClientRect();

    // getBoundingClientRect()์์ ์ป์ top์ ์์์ด๋ฏ๋ก, ์ฌ์ฉํ๊ธฐ ํธํ๊ฒ -1์ ๊ณฑํจ.
    const positiveTop = scroll.top * -1;

    // scroll.top์ ๋ฒ์๋ฅผ ์ ํํ์ง ์์ผ๋ฉด styled-components์์ width๊ฐ ์์์ก๋ค๊ฐ ๋ค์ ์ปค์ ธ๋ฒ๋ฆฌ๋ฏ๋ก(์์๋ก ํ๋๋๋ ๊ฒ ๋๋ฌธ์ ๊ทธ๋ฐ๋ฏ)
    // ์ํ๋ ๋ฒ์์์๋ง setState๊ฐ ๋๋๋ก ์ค์ 
    // ์ต๋๊ฐ ์ค์ ์ min-width๋ ๊ณ์ฐํด์ ์ค์ ํด์ผํจ
    if (positiveTop > 0 && positiveTop < 500) {
      setScrollTop(positiveTop);
    }

    // ์ํ๋ ๋ฒ์์์๋ง setState๊ฐ ๋๋๋ก ์ค์ 
    // ์ผ๋งํผ ๋ด๋ ค๊ฐ์ง ๊ณ ๋ คํด์ ๊ณ์ฐํด์ผํจ
    if (positiveTop > 0 && positiveTop < 780) {
      setScrollForTop(positiveTop);
    }

    if (positiveTop > 0 && positiveTop < 920) {
      setKuroTop(positiveTop);
    }

};

// ์ํ ์ ๋ชฉ ํ์ ์ธ์ด ์ ํ
// 0 : KR, 1 : JP, 2 : ENG
const [lang, setLang] = useState(1);

return (
<TopDiv ref={divRef}>
<LogoWrapper scrollForTop={scrollForTop}>
<LogoImg
src={process.env.PUBLIC_URL + "/assets/Ghibli_Logo.png"}
alt="logo"
scrollTop={scrollTop}
/>
</LogoWrapper>

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

const LogoWrapper = styled.div` position: absolute; top: ${(props) =>`${props.scrollForTop}px`}; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh; animation: ${ShowLogo} 1000ms ease-in-out; `;

const LogoImg = styled.img` display: block; min-width: 500px; max-width: 1000px; width: ${(props) =>`${1000 - props.scrollTop}px`}; height: auto; `;

````

์ฃผ์์ ๋ง์ ์ค๋ช์ด ์๊ธฐ ๋๋ฌธ์ ํฐ ์ค๋ช์ด ํ์์์ ๊ฒ ๊ฐ๋ค.
scroll ์ด๋ฒคํธ๋ฅผ ๊ฐ์ ธ์ค๋ ๊ฒ์ ํ ํ์ด์ง๋ฅผ ์ ์ํ์ ๋ ๋ง์ ์ํ์ฐฉ์ค๋ฅผ ๊ฑฐ์ณค๊ธฐ ๋๋ฌธ์ ์ค๋ช์ ์๋ตํ๊ฒ ๋ค.(๊ฒฝํ์ ํตํด ์ด ๋ถ๋ถ์ ๋ฌธ์  ์์ด ๋๊ธด๊ฒ ๋ฟ๋ฏ...)
styled-components์ props๋ฅผ ์ ๋ฌํด์ scroll ์ด๋ฒคํธ์์ ๊ฐ์ ธ์จ ๊ฐ๋ค์ ๊ณ์ฐํด์ width, top์ ์กฐ์ ํด์คฌ๋ค. ์ฌ์ค ์ด ๋ถ๋ถ์ ์์น๋ฅผ ๋๋ต์ ์ผ๋ก ๋ง์ถฐ์ ์กฐ์ ํ๋ ๊ฑฐ ์ธ์๋ ๋ฐฉ๋ฒ์ด ์์๋ค. ์ด๋ฏธ์ง๋ค์ด ์ ๋ถ ๋ค๋ฅธ ์์น์ ์์๊ณ , ๋ค๋ฅธ ์ด๋ฏธ์ง๋ค๊ณผ ๊ฒน์น์ง ์๊ฒ ๋์ ๋ ์กฐ์ ํด์ผํ๊ธฐ ๋๋ฌธ์ด๋ค.
๋ง์ฝ, ๋ฐ์ํ ์ฌ์ดํธ๋ก ์ ์ํ๊ฒ ๋๋ค๋ฉด ํฌ๊ธฐ๋ง๋ค ๋ค๋ฅธ ์ฐ์ฐ์ ์ ์ฉํ๋๋ก ์์ ํด์ผํ  ๊ฒ์ผ๋ก ์์๋๋ค.
top, width ๊ฐ์ ์กฐ์ ํ๋๋ฐ ํ์ํ state๋ค์ scroll ์ด๋ฒคํธ ๊ฐ์ ๋ฒ์๋ฅผ ์ ํํ์ฌ์ ์ํ๋ ์์น๊น์ง๋ง ์ด๋ํ๋๋ก ๋ง๋ค์๋ค. ๋ง์ฝ, ์ ํํ์ง ์์ผ๋ฉด ์์๊ฐ์ด ๋์ด์ ์์๊ณผ ๋ค๋ฅธ ์์น๋ก ์ด๋ํ๊ธฐ ๋๋ฌธ์ด๋ค.

## ๐ src/axios/Axios.js

์ฒ์ ํ์ด์ง๊ฐ ๋ ๋๋ง ๋  ๋๋ง ๋ฐ์ดํฐ๋ฅผ GETํด์ผ์ง ๋ฉ๋ชจ๋ฆฌ ๋ญ๋น๋ฅผ ์ค์ผ ์ ์๋ค.
๋ํ, ์ํ์ ํ๊ตญ ์ ๋ชฉ์ API ๋ฐ์ดํฐ์ ํฌํจ๋์ด ์์ง ์์๊ธฐ ๋๋ฌธ์, ๋ฐ๋ก ๋ง๋ค์ด์ ๋ฐ์์จ ๋ฐ์ดํฐ์ ํฉ์ณ์ค์ผ ํ๋ค.

```js
import axios from "axios";
import { useState, useEffect } from "react";

function Axios() {
  // ๋ฐ์์จ ์ํ ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ๊ธฐ ์ํ ๋น ๋ฐฐ์ด
  // ์์ง KR ์ํ ์ ๋ชฉ์ด ์์.
  const [rawMovie, setRawMovie] = useState([]);

  // KR ์ ๋ชฉ์ ๋ฃ์ด์ ์์ ํ ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ๊ธฐ ์ํ ๋น ๋ฐฐ์ด
  const [movie, setMovie] = useState([]);

  // API ํต์ ์ ์ํ URL
  const URL = "https://ghibliapi.herokuapp.com/films";

  // KR ์ํ ์ ๋ชฉ ๋ฐฐ์ด
  // API์ ์๋๊ฑฐ๋ผ ์ง์  ์์ฑํ์..
  const krTitle = [
    "์ฒ๊ณต์ ์ฑ ๋ผํจํ",
    "๋ฐ๋ง๋ถ์ด์ ๋ฌ",
    "์ด์์ง ํ ํ ๋ก",
    "๋ง๋ ๋ฐฐ๋ฌ๋ถ ํคํค",
    "์ถ์ต์ ๋ฐฉ์ธ๋ฐฉ์ธ",
    "๋ถ์ ๋ผ์ง",
    "ํผํฌ์ฝ ๋๊ตฌ๋ฆฌ ๋์์ ",
    "๊ท๋ฅผ ๊ธฐ์ธ์ด๋ฉด",
    "๋ชจ๋ธ๋ธ์ผ ํ๋ฉ",
    "์ด์์ง ์ผ๋ง๋ค๊ตฐ",
    "์ผ๊ณผ ์นํ๋ก์ ํ๋ฐฉ๋ถ๋ช",
    "๊ณ ์์ด์ ๋ณด์",
    "ํ์ธ์ ์์ง์ด๋ ์ฑ",
    "๊ฒ๋์ ๊ธฐ: ์ด์ค์์ ์ ์ค",
    "๋ฒผ๋ ์์ ํฌ๋จ",
    "๋ง๋ฃจ ๋ฐ ์๋ฆฌ์ํฐ",
    "์ฝ์ฟ ๋ฆฌ์ฝ ์ธ๋์์",
    "๋ฐ๋์ด ๋ถ๋ค",
    "๊ฐ๊ตฌ์ผ ๊ณต์ฃผ ์ด์ผ๊ธฐ",
    "์ถ์ต์ ๋ง๋",
    "๋ถ์ ๊ฑฐ๋ถ",
    "์์ผ์ ๋ง๋",
  ];

  // ์ฒซ ๋ ๋๋ง ๋  ๋๋ง, ๋ฐ์ดํฐ GET
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setRawMovie(res.data))
      .catch((e) => console.log("GET Error", e));
  }, []);

  // rawMovie๊ฐ ์๋ฐ์ดํธ ๋ ํ์ ํ๊ตญ์ด ์ ๋ชฉ์ rawMovie ๋ฐฐ์ด ๊ฐ ์์์ ๋ฃ์
  // ์๋๋ POST๋ PUT์ผ๋ก ํ๋ ค๊ณ ํ๋๋ฐ, ๊ณ์ 404 ์ค๋ฅ๊ฐ ๋ฐ์ํด์, ๋ฐ์ดํฐ๋ฅผ rawMovie ๋ฐฐ์ด์ ๋ฃ๊ณ  ๊ฐ ์์์ ์๋ฐ์ดํธํ๋ ๊ฑธ๋ก ์ ํ.
  useEffect(() => {
    // setRawMovie๋ฅผ ์ฌ์ฉํ๋ฉด ์๋จ. useEffect๊ฐ rawMovie๋ฅผ ์ง์ผ๋ณด๊ณ  ์๊ธฐ ๋๋ฌธ์ ๋ฌดํ ๋ฃจํ ๋ฐ์ํด๋ฒ๋ฆผ.
    // ์ฐธ๊ณ  ์ฌ์ดํธ(https://wnsdufdl.tistory.com/245)
    // useEffect ๋ด์์, let์ผ๋ก ์ ์ธํ ์ ์ญ ๋ณ์์๋ค๊ฐ map์์์ return ๊ฐ(KR ์ ๋ชฉ์ ์๋ฐ์ดํธํ ๋ฐฐ์ด)์ ๋ฃ์ผ๋ ค๊ณ  ํ๋๋ฐ, ๋ ๋๋ง๋๋ฉด์ ์ค๋ฅ๊ฐ ๋ฐ ๊ฐ๋ฅ์ฑ์ด ์์ผ๋ฏ๋ก ์ฒ ํ.
    // ์๋ก์ด setState๋ฅผ ๋ง๋ค์ด์ ๊ฑฐ๊ธฐ์ ์๋ฐ์ดํธ๋ rawMovie๋ฅผ ๋ฃ๋ ๊ฒ์ผ๋ก ํจ.
    setMovie(
      rawMovie.map((item, index) => {
        return { ...item, kr_title: krTitle[index] };
      })
    );
  }, [rawMovie]);

  return {
    movie,
    setMovie,
  };
}

export default Axios;
````

POST๋ฅผ ๋ฉ์๋๋ฅผ ์ฌ์ฉํด์ ๋ฐ์ดํฐ๋ฅผ ๋ฃ์ผ๋ ค๊ณ  ํ๋๋, API ์์ฒด์์ ๊ฑฐ๋ถ๋ฅผํ๋๋ก ๋์ด ์๋๊ฑด์ง ๋ญ์ง ๊ฒ์ํด์ ํต์  ์ค๋ฅ๊ฐ ๋ฐ์ํด์(๋ฐ์ดํฐ๋ ์ ๋๋ก ์ ์ก๋๊ณ  ์๋๊ฑธ ํ์ธํ๋ค) ๊ทธ๋ฅ GET ๋ฉ์๋๋ก ๋ฐ์์ state์ ํ ๋นํ ๋ค์ ๊ทธ ๊ฐ์ ์ง์  ์ถ๊ฐํ๋ ๊ฒ์ผ๋ก ํ๋ค.  
๋จ, axios๊ฐ ๋น๋๊ธฐ ๋์์ ํ๊ธฐ ๋๋ฌธ์ rawMovie๊ฐ ํ ๋น๋์ง ์์ ์ํ์์๋ ์ค๋ฅ๊ฐ ๋ฐ์ํด์, movie์์ KR ์ํ ์ ๋ชฉ์ ์ถ๊ฐํ๋ ๊ฒ์ useEffect๋ฅผ ํตํด rawMovie์ ๋ณํ๊ฐ ์๊ฒผ์ ๋๋ง(๋ฐ์ดํฐ๊ฐ GET ๋์์ ๋๋ง) ์๋ํ๋๋ก ๋ง๋ค์ด์คฌ๋ค.  
์ด๋ ๊ฒ ๋ฐ์ดํฐ ์ถ๊ฐ๊น์งํ movie์ ์ ๋ ฌ ๋ฑ์ ์ฌ์ฉํ  setMovie๋ฅผ return์ผ๋ก ๋ด๋ณด๋ด์คฌ๋ค.

## ๐ src/components/MovieList.js

```js
function MovieList({ movie, lang, setMovie, setLang }) {
  // ์์ ์๊ฐ์ ์/๋ถ ๋จ์๋ก ๊ณ์ฐ
  function runningTime(runtime) {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;

    const runTime = `${hour}์๊ฐ ${min}๋ถ`;

    return runTime;
  }

  return (
    <MovieWrapperDiv>
      <LangToggleBtn setLang={setLang} />

      <SortBtn movie={movie} setMovie={setMovie} />

      {movie.map((item, index) => {
        return (
          <MovieDiv key={index}>
            {lang === 0 ? <MovieTitle>{item.kr_title}</MovieTitle> : null}
            {lang === 1 ? <MovieTitle>{item.original_title}</MovieTitle> : null}
            {lang === 2 ? <MovieTitle>{item.title}</MovieTitle> : null}

            <MovieImg src={item.image} alt="movie" />
            <p>๊ฐ๋ : {item.director}</p>
            <p>ํ๋ก๋์ : {item.producer}</p>
            <p>๊ฐ๋ด ๋๋ : {item.release_date}๋</p>
            <p>
              ์์ ์๊ฐ : {item.running_time}๋ถ(
              {runningTime(item.running_time)})
            </p>
            <p>ํ์ : {item.rt_score}</p>
            {/* <MovieImg src={item.movie_banner} alt="movie" /> */}
          </MovieDiv>
        );
      })}
    </MovieWrapperDiv>
  );
}

export default MovieList;
```

API๋ก ๋ฐ์์จ ๋ฐ์ดํฐ๋ ์ํ์ ๋ฐํ์์ด ๋ถ ๋จ์๋ก๋ง ํ์๋์ด ์์๋ค. ๊ทธ๋์ ์ ๋จ์์ ๋ถ ๋จ์๋ก ์ชผ๊ฐ์ ํ๋ฒ ๋ ํ์ํด์ฃผ๋ ๊ฒ์ผ๋ก ํธ์์ฑ์ ๋์๋ค.  
์ง๊ธ ๋ฐ๊ฒฌํ๊ฑด๋ฐ, ์ฌ๋งํ๋ฉด parseInt() ๊ฐ์ ๊ฑธ๋ก ๋ฐ์ดํฐ ํ์์ ํ์คํ๊ฒ ๋ฐ๊ฟ์ ์ฐ์ฐ์ ํ์ผ๋ฉด ์ข์์ ๊ฒ ๊ฐ๋ค. ์๋์ ๋ฌธ์ ๋ ์์ง๋ง TypeScript๋ฅผ ์ฌ์ฉํ๊ฒ ๋๋ฉด ๋ถ๋ชํ ๋ฐ์ดํฐ ํ์์ ๋ช์ํด์ผํ๊ธฐ ๋๋ฌธ์ ์ต๊ด์ ์ ๋ค์ฌ์ผ๊ฒ ๋ค.  
์ํ ์ ๋ชฉ์ ํ,์ผ,์ ๋ฒ์ ์ผ๋ก ์ ํํ๋ ๋ฒํผ์ ๋ง๋ค์ด๋จ๋๋ฐ, ๊ฑฐ๊ธฐ์ setLang์ ํตํด ๋ณํ๋ lang์ ๊ฐ์ง๊ณ  ์ด๋ค ์ ๋ชฉ์ ํ์ํ  ์ง ์ค์ ํด์คฌ๋ค.  
์ฌ๊ธฐ์ ํ๊ฐ์ง ์ค์ํ๋ ๊ฒ์ด ์๋๋ฐ, ์ผํญ ์ฐ์ฐ์ ์์ ์ปดํฌ๋ํธ ์ ๋ถ๋ฅผ ๋ฃ๋๊ฒ ์๋๊ณ , ์ปดํฌ๋ํธ ์์ ์ผํญ ์ฐ์ฐ์๋ฅผ ํ๋์ฉ ๋ฃ์ด์คฌ์๋ค.  
์ด๋ ๊ฒ ๋๋ฉด ์ปดํฌ๋ํธ์ ๋ด์ฉ๋ฌผ์ ํํ ๋น ์ํ์ง๋ง, ์ปดํฌ๋ํธ ์์ฒด๋ ๊ณต๊ฐ์ ์ฐจ์งํ๊ธฐ ๋๋ฌธ์, lang์ด ๋ฐ๋ ๋๋ง๋ค ์ ๋ชฉ ์์น๊ฐ ์กฐ๊ธ์ฉ ๋ฌ๋ผ์ง๊ฒ๋๋ค.  
๋ฐ๋ผ์, ์ปดํฌ๋ํธ ์์ฒด๋ฅผ ์ผํญ ์ฐ์ฐ์ ์์ ๋ฃ์ด์ค์ผ์ง๋ง ์ด๋ฐ ์ฌ์ํ UI ์ค๋ฅ๊น์ง๋ ์ก์ ์ ์๋ค.

## ๐ src/components/LangToggleBtn.js

```js
function LangToggleBtn({ setLang }) {
  const [toggleBtn, setToggleBtn] = useState(false);

  const showLang = () => {
    setToggleBtn((prev) => !prev);
  };

  return (
    <StyledDiv>
      <StyledBtn onClick={showLang} toggleBtn={toggleBtn}>
        <IoEarthOutline size={30} />
      </StyledBtn>
      <StyledUl className={toggleBtn ? "active" : null}>
        <li>
          <button
            onClick={() => {
              setLang(0);
              showLang();
            }}
          >
            KR
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLang(1);
              showLang();
            }}
          >
            JP
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLang(2);
              showLang();
            }}
          >
            ENG
          </button>
        </li>
      </StyledUl>
    </StyledDiv>
  );
}

export default LangToggleBtn;

const StyledDiv = styled.div`
  position: absolute;
  top: 1220px;
  left: 20px;
  z-index: 100;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  position: absolute;
  top: -12.5px;
  left: 30px;
  display: flex;
  color: transparent;
  width: 100px;
  justify-content: space-between;

  // z-index๋ฅผ StyledBtn์ด๋ ๊ฐ์ ๊ฐ์ผ๋ก ์คฌ๋๋ ๊ฒน์ณ์ ธ์ ๋ฒํผ ํด๋ฆญ์ ๋ฐฉํด๊ฐ ๋๋ ์ํฉ ๋ฐ์
  // 1์ ๋ ์ค์ด๋ฉด transition ํจ๊ณผ๋ ์ ์งํ๊ณ , display๋ ์ ๊ฑด๋๋ฆฌ๋ฉด์ StyledBtn๊น์ง ์ด๋ฆด ์ ์์.
  z-index: 99;
  transition: all 500ms ease-in-out;

  &.active {
    color: black;
    left: 50px;
  }

  button {
    all: unset;
    cursor: pointer;
  }
`;
```

์ํ ์ ๋ชฉ์ ์ธ์ด ์ค์ ์ ๋ฐ๊พธ๋ ๋ฒํผ์ ๊ตฌํํ๋ค.  
์ฌ์ค ์ฐธ๊ณ ํ๋ ์ฌ์ดํธ์์๋ ํ์ด์ง ์ ์ฒด์ UI๊ฐ ๋๊ฑฐ ๋ณ๊ฒฝ๋๊ธฐ ๋๋ฌธ์ ์๋ก๊ณ ์นจ์ ๋ฐ์์ํค๋ a ํ๊ทธ๋ฅผ ์ฌ์ฉํ ๊ฒ์ผ๋ก ๋ณด์ด์ง๋ง, ์ด ํ๋ก์ ํธ๋ ๊ทธ๋งํผ์ UI ๋ณ๊ฒฝ์ ๋ณด์ฌ์ค๋งํ ์ด๋ฏธ์ง ์์ค๊ฐ ์๊ธฐ ๋๋ฌธ์ ๊ตณ์ด ๊ทธ๋ ๊ฒ ๋ง๋ค์ง๋ ์์๋ค.  
์ธ์ด ์ค์  ๋ฒํผ(์ง๊ตฌ ๋ชจ์ ์์ด์ฝ)์ ํด๋ฆญํ๋ฉด ์ ํํ  ์ ์๋ ์ธ์ด๊ฐ ๋ถ๋๋ฝ๊ฒ ๋ฑ์ฅํ๋ค.  
div(์ง๊ตฌ ๋ชจ์ ์์ด์ฝ)์ button(์ ํ ๊ฐ๋ฅ ์ธ์ด)์ด ๊ฒน์ณ์ div๋ฅผ ํด๋ฆญํ๋๋ button์ด ํด๋ฆญ๋๋ ์ํฉ์ด ๊ฐ๋์ฉ ์์๋ค.  
์ด๋ button์ ๋์ดํ๊ณ  ์๋ ul์ z-index๋ฅผ div๋ณด๋ค ๋ฎ๊ฒ ์ค์ ํ๋ ๊ฒ์ผ๋ก ํด๊ฒฐํ๋ค.  
๊ฐ ์ธ์ด ์ค์ ์ ํด๋ฆญํ๋ฉด setLang์ ํตํด lang์ ๋ณ๊ฒฝํ๊ณ  ์ด๋ ์ง์ ์ ์ดํด๋ดค๋ MovieList์ ๋ณํ๋ฅผ ์ค๋ค.

## ๐ src/components/SortBtn.js

```js
import styled from "styled-components";
import { useState } from "react";

function SortBtn({ movie, setMovie }) {
  // ์ ๋ ฌ ๊ตฌํ
  // movie ๋ฐฐ์ด ๋ณต์ฌ
  let sortedMovie = [...movie];

  // select ํ๊ทธ์ value prop์ผ๋ก ๋ฃ์ ๋ณ์. ๋ฌด์์ด ์ ํ๋์๋์ง ํ์ํ๋ ๊ธฐ๋ฅ.
  const [selected, setSelected] = useState("yearFast");

  // ์ฝค๋ณด ๋ฐ์ค์ ์๋ value์ ๋ฐ๋ผ ์ ๋ ฌ ๋ฐฉ์์ ๋ค๋ฅด๊ฒ ์ค์ 
  const sortMovie = (e) => {
    if (e.target.value === "yearFast") {
      // movie ๋ฐฐ์ด์ ๋จผ์  ๊ฐ๋ด๋ ์์ผ๋ก ์ ๋ ฌ
      sortedMovie.sort((prev, post) => {
        // parseInt()๋ฅผ ํตํด string ํ์์ number ํ์์ผ๋ก ๋ณ๊ฒฝ. 10์ง์
        // Number() ๋ฉ์๋์ ๋ค๋ฅธ ์ ์ ์ซ์ ๋ค์ ๋ฌธ์๊ฐ ์ ํ ์๋๋ผ๋ ๊ทธ ๋ถ๋ถ์ ์ ์ธํ๊ณ  ์ซ์๋ง ํ์ฑํด์ค๋ค๋ ์ 
        // ex) "2021๋" / parseInt() --> 2021, Number() --> NaN
        return (
          parseInt(prev.release_date, 10) - parseInt(post.release_date, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "yearSlow") {
      // movie ๋ฐฐ์ด์ ๋์ค์ ๊ฐ๋ด๋ ์์ผ๋ก ์ ๋ ฌ
      sortedMovie.sort((prev, post) => {
        return (
          parseInt(post.release_date, 10) - parseInt(prev.release_date, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "score") {
      // movie ๋ฐฐ์ด์ ํ์  ๋์ ์์ผ๋ก ์ ๋ ฌ
      sortedMovie.sort((prev, post) => {
        return parseInt(post.rt_score, 10) - parseInt(prev.rt_score, 10);
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "shortRunTime") {
      // movie ๋ฐฐ์ด์ ๋ฐํ์์ด ์งง์ ์์๋ก ์ ๋ ฌ
      sortedMovie.sort((prev, post) => {
        return (
          parseInt(prev.running_time, 10) - parseInt(post.running_time, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "longRunTime") {
      // movie ๋ฐฐ์ด์ ๋ฐํ์์ด ๊ธด ์์๋ก ์ ๋ ฌ
      sortedMovie.sort((prev, post) => {
        return (
          parseInt(post.running_time, 10) - parseInt(prev.running_time, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    }
  };

  // ์ฝค๋ณด ๋ฐ์ค์ ๋ฃ์ option ํ๊ทธ์ props๋ฅผ ๋ชจ์๋์
  const options = [
    { value: "yearFast", text: "๊ฐ๋ด ์ฐ๋ ๋น ๋ฅธ ์" },
    { value: "yearSlow", text: "๊ฐ๋ด ์ฐ๋ ๋๋ฆฐ ์" },
    { value: "score", text: "ํ์  ์" },
    { value: "shortRunTime", text: "์งง์ ์์ ์๊ฐ ์" },
    { value: "longRunTime", text: "๊ธด ์์ ์๊ฐ ์" },
  ];

  return (
    <StyledDiv>
      <ComboBox onChange={sortMovie} value={selected}>
        {options.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.text}
            </option>
          );
        })}
      </ComboBox>
    </StyledDiv>
  );
}

export default SortBtn;
```

์ด๋ฒ ํ๋ก์ ํธ ์ค ๊ฐ์ฅ ๊ตฌํ์ด ์ด๋ ค์ ๋ ๋ถ๋ถ์ด๋ค.  
์ฌ์ธ๊ฑฐ๋ผ ์๊ฐํ๋๋ฐ, ์ด ๊ฐ๋จํ ํด๋ฆญ ํ๋๊ฐ ์ด๋ฐ ๊ณผ์ ์ ๊ฑฐ์น๋ค๋๊ฒ ๋๋ผ์ ๋ค.(๋ด๊ฐ ์ฝ์งํ๊ณ  ์๋ ๊ฑธ์ง๋...)  
sort() ์์ฒด๋ ์ด๋ ค์ด๊ฒ ์์๋ค. ์ ๋ ฌ ๋ชฉ์ ๊ณผ ์ ๋ ฌ์ ํ์ํ ๊ฐ๋ค๋ง ์ ํด๋์ผ๋ฉด sort() ๋ฉ์๋ ์ฌ์ฉ๋ฒ์ ๋ฐ๋ผ ์ฐ์ฐ๋ง ํ๋ฉด ๋๊ธฐ ๋๋ฌธ์ด๋ค.  
๋ฌธ์ ๋ sort()๋ฅผ ์ ์ฉํ๊ณ , ์ ์ฉ๋์์์๋ ๋ถ๊ตฌํ๊ณ  ๋ฆฌ๋ ๋๋ง์ด ๋์ง ์์๋ค๋ ์ ์ ์๋ค.  
์ด ๋ฌธ์ ๋ก ์ธํด์ ์ ๋ง~~~~๋ง์ ์ฌ์ดํธ์ ์๋ฃ๋ค์ ์ฐพ์๋ดค๋ค. ๊ฒฐ๊ตญ ์ค์ํ ๊ฒ์ ๊ธฐ๋ณธ๊ธฐ์๋ ๊ฒ ๊ฐ๋ค. ํ๋ ์์ํฌ๋ฅผ ์ฌ์ฉํ๋ฉด์ ํ๋ ์์ํฌ์ฒ๋ผ ์ฌ๊ณ ํ์ง ์์๋ ๊ฒ์ด ํฐ ์ค์์๋ค.  
๋ฆฌ์กํธ๋ "๋ณ๊ฒฝ"์ด ์์ด์ผ์ง๋ง ๋ฆฌ๋ ๋๋ง์ด ๋๋ค. ์ฌ๊ธฐ์ ๋งํ๋ "๋ณ๊ฒฝ"์ ๋จ์ํ๊ฒ ๋ฐฐ์ด ๋ด๋ถ์์ sort()๋ก ์ธํด ์์๊ฐ ๋ณํ๋ค๋ ์ ๋๊ฐ ์๋๋ค.  
๋ฐฐ์ด ๋ด๋ถ์์ ์์๋ง ๋ณ๊ฒฝ์ด ๋๋ค๋ฉด, ๋ฆฌ์กํธ๋ ์ด๋ฅผ ๋ณ๊ฒฝ๋์ง ์์ ๊ฒ์ผ๋ก ๊ฐ์ฃผํ๋ค. ๋ด์ฉ๋ฌผ์ด ๊ฐ๊ธฐ ๋๋ฌธ์ด๋ค.  
๋ฐ๋ผ์ ์ฐ๋ฆฌ๋ ์ด "๋ณ๊ฒฝ"์ ๋ฆฌ์กํธ์๊ฒ ๋ณด์ฌ์ฃผ๊ธฐ ์ํด์ ๋ณต์ฌ๋ณธ์ ์ฌ์ฉํ  ๊ฒ์ด๋ค.  
movie ์์ฒด๋ฅผ sort()๋ฅผ ํ๋ค๊ณ ํ๋ค ๋ณ๊ฒฝ์ ๋์ง๋ง ๋ฆฌ๋ ๋๋ง์ด ๋์ง์๊ธฐ ๋๋ฌธ์, movie์ ๋ณต์ฌ๋ณธ์ sort()ํ๊ณ  ์ด๋ฅผ setMovie์ ๋ฃ์ด์ movie๋ฅผ ๋ณ๊ฒฝ์ํค๋ ๊ฒ์ด๋ค.  
๋ค์๊ณผ ๊ฐ์ ๊ณผ์ ์ ๊ฑฐ์น๋ค๊ณ  ๋ณด๋ฉด ๋๋ค.  
movie -> movie ๋ณต์ฌ -> ๋ณต์ฌ๋ movie + sort() -> setMovie์ ํ ๋น -> movie ๋ณ๊ฒฝ -> ๋ฆฌ๋ ๋๋ง  
ํด๋น ๋ฌธ์ ์ ๋ํ ์๋ฃ๊ฐ ๋ง์๋๊ฑธ๋ก ๋ด์, ํ๋ ์์ํฌ์ ์ธ ์ฌ๊ณ ๋ฅผ ํ๋ ๊ฒ์ด ์๋นํ ์ด๋ ค์ด ๊ฒ ๊ฐ๋ค๊ณ ๋ ๋๋๋ค. ๊ธฐ์ด๋ฅผ ํํํ ๋ค์ง์...

## ๐ค ํ๊ณ 

์ด๋ฒ ํ๋ก์ ํธ๋ ์ฃผ๋ณ ์ง์ธ๋ค์๊ฒ ๋ณด์ฌ์คฌ์ ๋, ๊ฝค ํธํ์ ๋ฐ์๋ค. UI์ ์ธ ์์๊ฐ animation์ด๋ transition์ด ๋ง์๊ธฐ ๋๋ฌธ์ ๊ทธ๋ฐ ๊ฒ ๊ฐ๋ค.  
ํํธ์ผ๋ก๋ ์์ธํ๊ธฐ๋ ํ๋ค. ๋ฆฌ์กํธ์ ๊ธฐ๋ณธ ๋์ ์๋ฆฌ๋ ์ ๋๋ก ์ดํด ๋ชปํ์ฑ๋ก ๋ง๋ค์๋ ๊ฒ์ด๊ธฐ ๋๋ฌธ์ด๋ค.(๋ฌผ๋ก  ์ง๊ธ์ ์๊ฒ๋์์ง๋ง)  
๋ฆฌ์กํธ์์ sort()๋ฅผ ํตํด ๋ฆฌ๋ ๋๋ง๊น์ง ํด๋ด๋ ๋ฒ๊ณผ ๋ฆฌ์กํธ์ ๊ธฐ๋ณธ ๋์ ์๋ฆฌ, ๋ฆฌ์กํธ ๋ด์์ select ํ๊ทธ์ ์ฌ์ฉ๋ฒ ๋ฑ์ ์๋กญ๊ฒ ์๊ฒ๋์๋ค!  
์๊ณ ํ์จ์ต๋๋ค~๐ฅณ
