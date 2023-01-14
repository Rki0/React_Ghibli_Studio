import React from "react";
import styled from "styled-components";

// 배너 하단에 있는 Kuro들을 출력하기 위한 배열.
// styled-components에 className 하나씩 다른 효과를 주려다보니 너무 힘들어서 통일된 인라인 스타일을 최대한 사용했다..
// 얘네는 인라인 스타일을 적용했으므로 className이 따로 필요 없을듯 하다. 따라서, 배열은 갯수만 설정하고 값은 아무거나 넣어도 됨.
const LeftKuroNum = [1, 2, 3, 4, 5, 6, 7];
const RightKuroNum = [1, 2, 3, 4, 5, 6];

function Floor() {
  return (
    <FloorKuro>
      <LeftKuro>
        {LeftKuroNum.map((item, index) => {
          return (
            <FloorDustDiv style={{ left: `${(item - 2) * 5}%` }} key={index}>
              <img
                src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                alt="black dust"
              />
            </FloorDustDiv>
          );
        })}
      </LeftKuro>

      <RightKuro>
        {RightKuroNum.map((item, index) => {
          return (
            <FloorDustDiv style={{ right: `${(item - 1) * 5}%` }} key={index}>
              <img
                src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                alt="black dust"
              />
            </FloorDustDiv>
          );
        })}
      </RightKuro>
    </FloorKuro>
  );
}

export default React.memo(Floor);

const FloorKuro = styled.div`
  position: absolute;
  top: 920px;
  display: flex;
  width: 100vw;
  height: 100px;
  justify-content: space-between;
`;

const LeftKuro = styled.div`
  display: flex;
  width: 30vw;
  height: 100px;
`;

const RightKuro = styled.div`
  display: flex;
  width: 30vw;
  height: 100px;
`;

const FloorDustDiv = styled.div`
  display: block;
  position: absolute;

  img {
    width: 100px;
    height: 100px;
  }
`;
