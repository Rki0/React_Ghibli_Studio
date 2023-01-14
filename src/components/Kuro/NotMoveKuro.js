import React from "react";
import styled from "styled-components";
import { Rotate, Updown } from "../../shared/animation";

const notScrollKuro = [1, 3, 5];

function NotMoveKuro() {
  return (
    <>
      {notScrollKuro.map((item, index) => {
        return (
          <OnlyRotateKuro className={`dust${item}`} key={index}>
            <figure>
              <img
                src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                alt="black dust"
              />
            </figure>
          </OnlyRotateKuro>
        );
      })}
    </>
  );
}

export default React.memo(NotMoveKuro);

const OnlyRotateKuro = styled.div`
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

  &.dust3 {
    top: 350px;
    left: 5%;
    animation: ${Updown} 2000ms infinite;
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
