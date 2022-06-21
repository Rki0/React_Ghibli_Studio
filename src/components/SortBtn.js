import styled from "styled-components";

function SortBtn({ movie }) {
  // 정렬 구현
  // 정렬된 값들을 저장하기 위한 빈 배열
  // 얘를 사용하게 되면, components/MovieList.js에서 사용한 모든 값들을 넣어줘야하는 매우 비효율적인 상황 발생
  // 따라서, movie와 sort()를 적절하게 사용해서 정렬을 구현해야 할 것 같다.
  // let sortedMovie = [];

  // 콤보 박스에 있는 value에 따라 정렬 방식을 다르게 설정
  const sortMovie = (e) => {
    if (e.target.value === "yearFast") {
      // movie 배열을 먼저 개봉된 순으로 정렬
      // 개봉 연도가 작을 수록 먼저 보여야함
      movie.sort((prev, post) => {
        // parseInt()를 통해 string 타입을 number 타입으로 변경. 10진수
        // Number() 메서드와 다른 점은 숫자 뒤에 문자가 적혀 있더라도 그 부분은 제외하고 숫자만 파싱해준다는 점
        // ex) "2021년" / parseInt() --> 2021, Number() --> NaN
        // 참고 사이트 : https://jamong-icetea.tistory.com/14
        return (
          parseInt(prev.release_date, 10) - parseInt(post.release_date, 10)
        );
      });
    } else if (e.target.value === "yearSlow") {
      // movie 배열을 나중에 개봉된 순으로 정렬
      movie.sort((prev, post) => {
        return (
          parseInt(post.release_date, 10) - parseInt(prev.release_date, 10)
        );
      });
    } else if (e.target.value === "score") {
      // movie 배열을 평점 높은 순으로 정렬
      movie.sort((prev, post) => {
        return parseInt(post.rt_score, 10) - parseInt(prev.rt_score, 10);
      });
    } else if (e.target.value === "shortRunTime") {
      // movie 배열을 런타임이 짧은 순서로 정렬
      movie.sort((prev, post) => {
        return (
          parseInt(prev.running_time, 10) - parseInt(post.running_time, 10)
        );
      });
    } else if (e.target.value === "longRunTime") {
      // movie 배열을 런타임이 긴 순서로 정렬
      movie.sort((prev, post) => {
        return (
          parseInt(post.running_time, 10) - parseInt(prev.running_time, 10)
        );
      });
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
      <ComboBox defaultValue="개봉 연도 빠른 순" onChange={sortMovie}>
        {options.map((item) => {
          return <option value={item.value}>{item.text}</option>;
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
