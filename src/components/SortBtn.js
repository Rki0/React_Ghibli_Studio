import styled from "styled-components";
import { useState } from "react";

function SortBtn({ movie, setMovie }) {
  // 정렬 구현
  // 정렬된 값들을 저장하기 위한 빈 배열
  // 얘를 사용하게 되면, components/MovieList.js에서 사용한 모든 값들을 넣어줘야하는 매우 비효율적인 상황 발생
  // 따라서, movie와 sort()를 적절하게 사용해서 정렬을 구현해야 할 것 같다.
  // let sortedMovie = [];

  // 이해가 안되는 문제 발생
  // 콤보 박스도 구현했고, 정렬도 구현했는데, 콤보 박스에서 option을 선택하면 화면이 그대로고 스크롤을 메인 화면가 보일 때까지 올렸다가 와야지 정렬이 적용된다.
  // 이는 내가 코딩 사고를 리액트적으로 하지 못했기 때문에 발생한 것으로 생각된다.
  // 참고 사이트(https://stackoverflow.com/questions/28868071/onchange-event-using-react-js-for-drop-down)
  // 리액트는 배열 내부에 변화가 있어도, 내용물이 같다면 변하지 않는 것으로 본다. 따라서 sort()를 해도 정렬은 되는데, 재렌더링은 되지 않는 것이다.
  // 그래서 movie 배열을 복사해서 새로운 배열로 인식하게 만든 뒤, 복사된 그 배열을 정렬해서 setMovie에 넣고 movie를 업데이트한다.
  // 참고 사이트(https://dj-min43.medium.com/react-%EB%82%A0%EC%A7%9C%EC%88%9C%EC%9C%BC%EB%A1%9C-%EC%A0%95%EB%A0%AC%ED%95%98%EA%B8%B0-9d40c098ad9)
  // 참고 사이트(https://m.blog.naver.com/psj9102/222148529277)
  // 참고 사이트(https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render)
  let sortedMovie = [...movie];

  // select 태그에 value prop으로 넣을 변수. 무엇이 선택되었는지 표시하는 기능.
  const [selected, setSelected] = useState("yearFast");

  // 콤보 박스에 있는 value에 따라 정렬 방식을 다르게 설정
  const sortMovie = (e) => {
    if (e.target.value === "yearFast") {
      // movie 배열을 먼저 개봉된 순으로 정렬
      // 개봉 연도가 작을 수록 먼저 보여야함
      sortedMovie.sort((prev, post) => {
        // parseInt()를 통해 string 타입을 number 타입으로 변경. 10진수
        // Number() 메서드와 다른 점은 숫자 뒤에 문자가 적혀 있더라도 그 부분은 제외하고 숫자만 파싱해준다는 점
        // ex) "2021년" / parseInt() --> 2021, Number() --> NaN
        // 참고 사이트(https://jamong-icetea.tistory.com/14)
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
      {/* select 태그의 option을 클릭했을 때 이 값을 활용하고 싶다면, select 태그에 onChange를 사용하면 됨 */}
      {/* 리액트에서 select 태그는 defaultValue나 value, 둘 중 하나만 사용해야한다 */}
      {/* 참고사이트(https://chinsun9.github.io/2020/12/07/Select-elements-must-be-either-controlled-or-uncontrolled/) */}
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

const StyledDiv = styled.div`
  position: absolute;
  top: 1220px;
  right: 20px;
  z-index: 100;
`;

const ComboBox = styled.select`
  width: 120px;
  height: 30px;
`;
