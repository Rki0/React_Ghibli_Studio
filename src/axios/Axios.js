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
