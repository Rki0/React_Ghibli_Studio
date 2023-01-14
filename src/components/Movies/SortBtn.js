import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 콤보 박스에 넣을 option 태그의 props를 모아놓음
const options = [
  { value: "default", text: "정렬 방식 선택하기" },
  { value: "yearFast", text: "과거 개봉 순" },
  { value: "yearSlow", text: "최신 개봉 순" },
  { value: "score", text: "평점 순" },
  { value: "shortRunTime", text: "짧은 상영 시간 순" },
  { value: "longRunTime", text: "긴 상영 시간 순" },
];

function SortBtn({ movie, setMovie }) {
  // select 태그에 value prop으로 넣을 변수. 무엇이 선택되었는지 표시하는 기능.
  const [selected, setSelected] = useState("default");

  // 콤보 박스에 있는 value에 따라 정렬 방식을 다르게 설정
  const optionHandler = (e) => {
    if (e.target.value === "yearFast") {
      setSelected(e.target.value);
    } else if (e.target.value === "yearSlow") {
      setSelected(e.target.value);
    } else if (e.target.value === "score") {
      setSelected(e.target.value);
    } else if (e.target.value === "shortRunTime") {
      setSelected(e.target.value);
    } else if (e.target.value === "longRunTime") {
      setSelected(e.target.value);
    }
  };

  const sortMovie = () => {
    let copiedMovie = [...movie];

    if (selected === "yearFast") {
      // movie 배열을 먼저 개봉된 순으로 정렬
      // 개봉 연도가 작을 수록 먼저 보여야함
      copiedMovie.sort((prev, post) => {
        const prevDate = Number(prev.release.replace(/[.]/g, ""));
        const postDate = Number(post.release.replace(/[.]/g, ""));

        return prevDate - postDate;
      });

      setMovie(copiedMovie);
    } else if (selected === "yearSlow") {
      // movie 배열을 나중에 개봉된 순으로 정렬
      copiedMovie.sort((prev, post) => {
        const prevDate = Number(prev.release.replace(/[.]/g, ""));
        const postDate = Number(post.release.replace(/[.]/g, ""));

        return postDate - prevDate;
      });

      setMovie(copiedMovie);
    } else if (selected === "score") {
      // movie 배열을 평점 높은 순으로 정렬
      copiedMovie.sort((prev, post) => {
        const prevScore = Number(prev.reviews.imdb.split("/")[0]);
        const postScore = Number(post.reviews.imdb.split("/")[0]);

        return postScore - prevScore;
      });

      setMovie(copiedMovie);
    } else if (selected === "shortRunTime") {
      // movie 배열을 런타임이 짧은 순서로 정렬
      copiedMovie.sort((prev, post) => {
        return (
          parseInt(prev.runtimeMinutes, 10) - parseInt(post.runtimeMinutes, 10)
        );
      });

      setMovie(copiedMovie);
    } else if (selected === "longRunTime") {
      // movie 배열을 런타임이 긴 순서로 정렬
      copiedMovie.sort((prev, post) => {
        return (
          parseInt(post.runtimeMinutes, 10) - parseInt(prev.runtimeMinutes, 10)
        );
      });

      setMovie(copiedMovie);
    }
  };

  useEffect(() => {
    sortMovie();
  }, [selected]);

  return (
    <StyledDiv>
      {/* select 태그의 option을 클릭했을 때 이 값을 활용하고 싶다면, select 태그에 onChange를 사용하면 됨 */}
      {/* 리액트에서 select 태그는 defaultValue나 value, 둘 중 하나만 사용해야한다 */}
      {/* 참고사이트(https://chinsun9.github.io/2020/12/07/Select-elements-must-be-either-controlled-or-uncontrolled/) */}
      {/* <ComboBox onChange={optionHandler} value={selected}> */}
      <ComboBox onChange={optionHandler} value={selected}>
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
export default React.memo(SortBtn);

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
