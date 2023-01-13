import React from "react";
import styled, { keyframes } from "styled-components";

// 메인 배너에 있는 Kuro들을 출력하기 위한 배열. className에 활용하기 위해 개수만큼 다른 숫자를 넣음.
const kuroAni = [1, 2, 3, 4, 5];

function Kuros({ kuroTop }) {
  // 스크롤로 움직이는 애들이랑, 아닌 애들이랑 갈라줘야할듯. 클래스 생성이 모든 애들한테서 발생하고 있음.
  return (
    <React.Fragment>
      {kuroAni.map((item, index) => {
        return (
          <BlackDustDiv className={`dust${item}`} kuroTop={kuroTop} key={index}>
            <figure>
              <img
                src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                alt="black dust"
              />
            </figure>
          </BlackDustDiv>
        );
      })}
    </React.Fragment>
  );
}

export default React.memo(Kuros);

const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  30% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Updown = keyframes`
  0% {
    transform: translateY(0) rotate(-25deg);
  }

  30% {
    transform: translateY(50%) rotate(-25deg);
  }

  100% {
    transform: translateY(0) rotate(-25deg);
  }
`;

const BlackDustDiv = styled.div.attrs()`
  display: block;
  position: absolute;

  &.dust1 {
    top: 100px;
    left: 50%;
    animation: ${Rotate} 3000ms ease-in-out infinite;

    figure {
      animation: ${Updown} 3600ms infinite;
    }
  }

  &.dust2 {
    top: ${(props) => 580 + props.kuroTop / 2.85}px;
    right: ${(props) => 10 + props.kuroTop / 50}%;
    animation: ${Rotate} 2000ms cubic-bezier(0.49, 0.76, 0.64, 0.42) infinite;
  }

  &.dust3 {
    top: 350px;
    left: 5%;
    animation: ${Updown} 2000ms infinite;
  }

  &.dust4 {
    top: ${(props) => props.kuroTop + 60 - 75}px;
    left: ${(props) => props.kuroTop / 100 + 18}%;
    animation: ${Rotate} 4000ms cubic-bezier(0.49, 0.76, 0.64, 0.42) infinite;
  }

  &.dust5 {
    top: 200px;
    right: 10%;
    animation: ${Updown} 3000ms infinite;
  }

  img {
    width: 100px;
    height: 100px;
  }
`;
