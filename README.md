# 🎥 Ghibli Studio

API 활용 예제로 많이 쓰이는 영화 추천 사이트!  
평범하게 만들기는 싫고, 영화를 크게 좋아하지 않기 때문에 흥미도 없었다.  
단, 지브리는 예외니까..  
어떤 디자인을 참고할까 고민을 했다. 그러던 중 일본에 있는 지브리 공원 공식 사이트가 있길래 그 것을 참고했다.  
이미지나 애니메이션 효과 등을 많이 참고했다.  
[지브리 공원 공식 사이트](https://ghibli-park.jp/)

## 🗂 파일 구조

Link 같은 Route 관련 태그는 사용하지 않았기 때문에 굉장히 간단하다.  
심지어 CRUD 기능도 필요없어서 Redux로 따로 사용하지 않았다.

<img width="168" alt="스크린샷 2022-06-22 오후 1 51 53" src="https://user-images.githubusercontent.com/86224851/174946209-0b03079e-4326-427c-88db-1bf433fcb75f.png">
  
## 📂 src/App.js
이 부분에서 눈여겨 볼 것은 scroll 이벤트에 따른 이미지 요소의 확대, 축소, 이동이다.  
크게 중요하지 않은 부분은 삭제했으니, 원본 코드와 다르다.  
  
```js
function App() {
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

주석에 많은 설명이 있기 때문에 큰 설명이 필요없을 것 같다.
scroll 이벤트를 가져오는 것은 풀 페이지를 제작했을 때 많은 시행착오를 거쳤기 때문에 설명을 생략하겠다.(경험을 통해 이 부분을 문제 없이 넘긴게 뿌듯...)
styled-components에 props를 전달해서 scroll 이벤트에서 가져온 값들을 계산해서 width, top을 조절해줬다. 사실 이 부분은 위치를 대략적으로 맞춰서 조절하는 거 외에는 방법이 없었다. 이미지들이 전부 다른 위치에 있었고, 다른 이미지들과 겹치지 않게 동선도 조정해야했기 때문이다.
만약, 반응형 사이트로 제작하게 된다면 크기마다 다른 연산을 적용하도록 수정해야할 것으로 예상된다.
top, width 값을 조정하는데 필요한 state들은 scroll 이벤트 값에 범위를 제한하여서 원하는 위치까지만 이동하도록 만들었다. 만약, 제한하지 않으면 음수값이 되어서 예상과 다른 위치로 이동하기 때문이다.

## 📂 src/axios/Axios.js

처음 페이지가 렌더링 될 때만 데이터를 GET해야지 메모리 낭비를 줄일 수 있다.
또한, 영화의 한국 제목은 API 데이터에 포함되어 있지 않았기 때문에, 따로 만들어서 받아온 데이터와 합쳐줘야 했다.

```js
import axios from "axios";
import { useState, useEffect } from "react";

function Axios() {
  // 받아온 영화 데이터를 저장하기 위한 빈 배열
  // 아직 KR 영화 제목이 없음.
  const [rawMovie, setRawMovie] = useState([]);

  // KR 제목을 넣어서 수정한 데이터를 저장하기 위한 빈 배열
  const [movie, setMovie] = useState([]);

  // API 통신을 위한 URL
  const URL = "https://ghibliapi.herokuapp.com/films";

  // KR 영화 제목 배열
  // API에 없는거라 직접 생성했음..
  const krTitle = [
    "천공의 성 라퓨타",
    "반딧불이의 묘",
    "이웃집 토토로",
    "마녀 배달부 키키",
    "추억은 방울방울",
    "붉은 돼지",
    "폼포코 너구리 대작전",
    "귀를 기울이면",
    "모노노케 히메",
    "이웃집 야마다군",
    "센과 치히로의 행방불명",
    "고양이의 보은",
    "하울의 움직이는 성",
    "게드전기: 어스시의 전설",
    "벼랑 위의 포뇨",
    "마루 밑 아리에티",
    "코쿠리코 언덕에서",
    "바람이 분다",
    "가구야 공주 이야기",
    "추억의 마니",
    "붉은 거북",
    "아야와 마녀",
  ];

  // 첫 렌더링 될 때만, 데이터 GET
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setRawMovie(res.data))
      .catch((e) => console.log("GET Error", e));
  }, []);

  // rawMovie가 업데이트 된 후에 한국어 제목을 rawMovie 배열 각 원소에 넣음
  // 원래는 POST나 PUT으로 하려고했는데, 계속 404 오류가 발생해서, 데이터를 rawMovie 배열에 넣고 각 원소에 업데이트하는 걸로 전환.
  useEffect(() => {
    // setRawMovie를 사용하면 안됨. useEffect가 rawMovie를 지켜보고 있기 때문에 무한 루프 발생해버림.
    // 참고 사이트(https://wnsdufdl.tistory.com/245)
    // useEffect 내에서, let으로 선언한 전역 변수에다가 map에서의 return 값(KR 제목을 업데이트한 배열)을 넣으려고 했는데, 렌더링되면서 오류가 뜰 가능성이 있으므로 철회.
    // 새로운 setState를 만들어서 거기에 업데이트된 rawMovie를 넣는 것으로 함.
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

POST를 메서드를 사용해서 데이터를 넣으려고 했더니, API 자체에서 거부를하도록 되어 있는건지 뭔지 게속해서 통신 오류가 발생해서(데이터는 제대로 전송되고 있는걸 확인했다) 그냥 GET 메서드로 받아와 state에 할당한 뒤에 그 값에 직접 추가하는 것으로 했다.  
단, axios가 비동기 동작을 하기 때문에 rawMovie가 할당되지 않은 상태에서는 오류가 발생해서, movie에서 KR 영화 제목을 추가하는 것은 useEffect를 통해 rawMovie에 변화가 생겼을 때만(데이터가 GET 되었을 때만) 작동하도록 만들어줬다.  
이렇게 데이터 추가까지한 movie와 정렬 등에 사용할 setMovie를 return으로 내보내줬다.

## 📂 src/components/MovieList.js

```js
function MovieList({ movie, lang, setMovie, setLang }) {
  // 상영 시간을 시/분 단위로 계산
  function runningTime(runtime) {
    const min = runtime % 60;
    const hour = (runtime - min) / 60;

    const runTime = `${hour}시간 ${min}분`;

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
```

API로 받아온 데이터는 영화의 런타임이 분 단위로만 표시되어 있었다. 그래서 시 단위와 분 단위로 쪼개서 한번 더 표시해주는 것으로 편의성을 높였다.  
지금 발견한건데, 웬만하면 parseInt() 같은 걸로 데이터 타입을 확실하게 바꿔서 연산을 했으면 좋았을 것 같다. 작동에 문제는 없지만 TypeScript를 사용하게 되면 분명히 데이터 타입을 명시해야하기 때문에 습관을 잘 들여야겠다.  
영화 제목을 한,일,영 버전으로 전환하는 버튼을 만들어놨는데, 거기서 setLang을 통해 변환된 lang을 가지고 어떤 제목을 표시할 지 설정해줬다.  
여기서 한가지 실수했던 것이 있는데, 삼항 연산자 안에 컴포넌트 전부를 넣는게 아니고, 컴포넌트 안에 삼항 연산자를 하나씩 넣어줬었다.  
이렇게 되면 컴포넌트에 내용물은 텅텅 빈 상태지만, 컴포넌트 자체는 공간을 차지하기 때문에, lang이 바뀔 때마다 제목 위치가 조금씩 달라지게된다.  
따라서, 컴포넌트 자체를 삼항 연산자 안에 넣어줘야지만 이런 사소한 UI 오류까지도 잡을 수 있다.

## 📂 src/components/LangToggleBtn.js

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

  // z-index를 StyledBtn이랑 같은 값으로 줬더니 겹쳐져서 버튼 클릭에 방해가 되는 상황 발생
  // 1정도 줄이면 transition 효과도 유지하고, display도 안 건드리면서 StyledBtn까지 살릴 수 있음.
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

영화 제목의 언어 설정을 바꾸는 버튼을 구현했다.  
사실 참고했던 사이트에서는 페이지 전체의 UI가 대거 변경되기 때문에 새로고침을 발생시키는 a 태그를 사용한 것으로 보이지만, 이 프로젝트는 그만큼의 UI 변경을 보여줄만한 이미지 소스가 없기 때문에 굳이 그렇게 만들지는 않았다.  
언어 설정 버튼(지구 모양 아이콘)을 클릭하면 선택할 수 있는 언어가 부드럽게 등장한다.  
div(지구 모양 아이콘)와 button(선택 가능 언어)이 겹쳐서 div를 클릭했더니 button이 클릭되는 상황이 가끔씩 있었다.  
이는 button을 나열하고 있는 ul의 z-index를 div보다 낮게 설정하는 것으로 해결했다.  
각 언어 설정을 클릭하면 setLang을 통해 lang을 변경하고 이는 직전에 살펴봤던 MovieList에 변화를 준다.

## 📂 src/components/SortBtn.js

```js
import styled from "styled-components";
import { useState } from "react";

function SortBtn({ movie, setMovie }) {
  // 정렬 구현
  // movie 배열 복사
  let sortedMovie = [...movie];

  // select 태그에 value prop으로 넣을 변수. 무엇이 선택되었는지 표시하는 기능.
  const [selected, setSelected] = useState("yearFast");

  // 콤보 박스에 있는 value에 따라 정렬 방식을 다르게 설정
  const sortMovie = (e) => {
    if (e.target.value === "yearFast") {
      // movie 배열을 먼저 개봉된 순으로 정렬
      sortedMovie.sort((prev, post) => {
        // parseInt()를 통해 string 타입을 number 타입으로 변경. 10진수
        // Number() 메서드와 다른 점은 숫자 뒤에 문자가 적혀 있더라도 그 부분은 제외하고 숫자만 파싱해준다는 점
        // ex) "2021년" / parseInt() --> 2021, Number() --> NaN
        return (
          parseInt(prev.release_date, 10) - parseInt(post.release_date, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "yearSlow") {
      // movie 배열을 나중에 개봉된 순으로 정렬
      sortedMovie.sort((prev, post) => {
        return (
          parseInt(post.release_date, 10) - parseInt(prev.release_date, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "score") {
      // movie 배열을 평점 높은 순으로 정렬
      sortedMovie.sort((prev, post) => {
        return parseInt(post.rt_score, 10) - parseInt(prev.rt_score, 10);
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "shortRunTime") {
      // movie 배열을 런타임이 짧은 순서로 정렬
      sortedMovie.sort((prev, post) => {
        return (
          parseInt(prev.running_time, 10) - parseInt(post.running_time, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    } else if (e.target.value === "longRunTime") {
      // movie 배열을 런타임이 긴 순서로 정렬
      sortedMovie.sort((prev, post) => {
        return (
          parseInt(post.running_time, 10) - parseInt(prev.running_time, 10)
        );
      });

      setMovie(sortedMovie);

      setSelected(e.target.value);
    }
  };

  // 콤보 박스에 넣을 option 태그의 props를 모아놓음
  const options = [
    { value: "yearFast", text: "개봉 연도 빠른 순" },
    { value: "yearSlow", text: "개봉 연도 느린 순" },
    { value: "score", text: "평점 순" },
    { value: "shortRunTime", text: "짧은 상영 시간 순" },
    { value: "longRunTime", text: "긴 상영 시간 순" },
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

이번 프로젝트 중 가장 구현이 어려웠던 부분이다.  
쉬울거라 생각했는데, 이 간단한 클릭 하나가 이런 과정을 거친다는게 놀라웠다.(내가 삽질하고 있는 걸지도...)  
sort() 자체는 어려운게 없었다. 정렬 목적과 정렬에 필요한 값들만 정해놓으면 sort() 메서드 사용법에 따라 연산만 하면 되기 때문이다.  
문제는 sort()를 적용했고, 적용되었음에도 불구하고 리렌더링이 되지 않았다는 점에 있다.  
이 문제로 인해서 정말~~~~많은 사이트와 자료들을 찾아봤다. 결국 중요한 것은 기본기였던 것 같다. 프레임워크를 사용하면서 프레임워크처럼 사고하지 않았던 것이 큰 실수였다.  
리액트는 "변경"이 있어야지만 리렌더링이 된다. 여기서 말하는 "변경"은 단순하게 배열 내부에서 sort()로 인해 순서가 변한다는 정도가 아니다.  
배열 내부에서 순서만 변경이 된다면, 리액트는 이를 변경되지 않은 것으로 간주한다. 내용물이 같기 때문이다.  
따라서 우리는 이 "변경"을 리액트에게 보여주기 위해서 복사본을 사용할 것이다.  
movie 자체를 sort()를 한다고한들 변경은 되지만 리렌더링이 되지않기 때문에, movie의 복사본을 sort()하고 이를 setMovie에 넣어서 movie를 변경시키는 것이다.  
다음과 같은 과정을 거친다고 보면 된다.  
movie -> movie 복사 -> 복사된 movie + sort() -> setMovie에 할당 -> movie 변경 -> 리렌더링  
해당 문제에 대한 자료가 많았던걸로 봐서, 프레임워크적인 사고를 하는 것이 상당히 어려운 것 같다고도 느낀다. 기초를 탄탄히 다지자...

## 🤔 회고

이번 프로젝트는 주변 지인들에게 보여줬을 때, 꽤 호평을 받았다. UI적인 요소가 animation이나 transition이 많았기 때문에 그런 것 같다.  
한편으로는 씁쓸하기도 했다. 리액트의 기본 동작 원리도 제대로 이해 못한채로 만들었던 것이기 때문이다.(물론 지금은 알게되었지만)  
리액트에서 sort()를 통해 리렌더링까지 해내는 법과 리액트의 기본 동작 원리, 리액트 내에서 select 태그의 사용법 등을 새롭게 알게되었다!  
수고하셨습니다~🥳
