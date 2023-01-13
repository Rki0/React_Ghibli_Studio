import Data from "./Data.json";

function LoadData() {
  // API 통신을 위한 URL
  // const URL = "https://ghibliapi.herokuapp.com/films";
  const importedMovie = Data.movies;

  const krTitle = [
    "마루 밑 아리에티",
    "천공의 성 라퓨타",
    "아야와 마녀",
    "코쿠리코 언덕에서",
    "반딧불이의 묘",
    "그대들, 어떻게 살 것인가",
    "하울의 움직이는 성",
    "마녀 배달부 키키",
    "이웃집 토토로",
    "이웃집 야마다군",
    "바다가 들린다",
    "추억은 방울방울",
    "폼포코 너구리 대작전",
    "벼랑 위의 포뇨",
    "붉은 돼지",
    "모노노케 히메",
    "센과 치히로의 행방불명",
    "게드전기: 어스시의 전설",
    "고양이의 보은",
    "가구야 공주 이야기",
    "바람이 분다",
    "추억의 마니",
    "귀를 기울이면",
  ];

  const addedMovie = importedMovie.map((item, index) => ({
    ...item,
    kr_title: krTitle[index],
  }));

  return addedMovie;
}

export default LoadData;
