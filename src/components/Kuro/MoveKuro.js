import React from "react";
import styled, { css } from "styled-components";

import { Rotate } from "../../shared/animation";

const scrollKuro = [2, 4];

function MoveKuro(props) {
  return (
    <>
      {scrollKuro.map((item, index) => {
        return (
          <ScrollKuro
            location={item === 2 ? "rightKuro" : "leftKuro"}
            kuroTop={props.kuroTop}
            key={index}
          >
            <figure>
              <KuroImg
                src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                alt="black dust"
              />
            </figure>
          </ScrollKuro>
        );
      })}
    </>
  );
}

export default MoveKuro;

const ScrollKuro = styled.div.attrs((props) => ({
  style: {
    display: "block",
    position: "absolute",
    top:
      props.location === "rightKuro"
        ? `${580 + props.kuroTop / 2.85}px`
        : `${props.kuroTop + 60 - 75}px`,
    right:
      props.location === "rightKuro" ? `${10 + props.kuroTop / 50}%` : null,
    left:
      props.location === "rightKuro" ? null : `${props.kuroTop / 100 + 18}%`,
  },
}))`
  animation: ${(props) =>
    props.location === "rightKuro"
      ? css`
          ${Rotate} 2000ms cubic-bezier(0.49, 0.76, 0.64, 0.42) infinite
        `
      : css`
          ${Rotate} 4000ms cubic-bezier(0.49, 0.76, 0.64, 0.42) infinite
        `};
`;

const KuroImg = styled.img`
  width: 100px;
  height: 100px;
`;
