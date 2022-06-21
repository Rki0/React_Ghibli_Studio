import styled, { keyframes } from "styled-components";

function Kuros({ kuroTop }) {
  // 메인 배너에 있는 Kuro들을 출력하기 위한 배열. className에 활용하기 위해 개수만큼 다른 숫자를 넣음.
  const kuroAni = [1, 2, 3, 4, 5];

  // 배너 하단에 있는 Kuro들을 출력하기 위한 배열.
  // styled-components에 className 하나씩 다른 효과를 주려다보니 너무 힘들어서 통일된 인라인 스타일을 최대한 사용했다..
  // 얘네는 인라인 스타일을 적용했으므로 className이 따로 필요 없을듯 하다. 따라서, 배열은 갯수만 설정하고 값은 아무거나 넣어도 됨.
  const LeftKuroNum = [1, 2, 3, 4, 5, 6, 7];
  const RightKuroNum = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {kuroAni.map((item, index) => {
        return (
          <BlackDustDiv className={`dust${item}`} kuroTop={kuroTop}>
            <figure>
              <img
                src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                alt="black dust"
              />
            </figure>
          </BlackDustDiv>
        );
      })}

      <FloorKuro>
        <LeftKuro>
          {LeftKuroNum.map((item, index) => {
            return (
              <FloorDustDiv style={{ left: `${(item - 2) * 5}%` }}>
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
              <FloorDustDiv style={{ right: `${(item - 1) * 5}%` }}>
                <img
                  src="https://ghibli-park.jp/site/img/index/kuro02.svg"
                  alt="black dust"
                />
              </FloorDustDiv>
            );
          })}
        </RightKuro>
      </FloorKuro>
    </>
  );
}

export default Kuros;

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

const BlackDustDiv = styled.div`
  display: block;
  position: absolute;
  // animation: ${Rotate} 3000ms ease-in-out infinite;

  &.dust1 {
    top: 100px;
    left: 50%;
    animation: ${Rotate} 3000ms ease-in-out infinite;

    figure {
      animation: ${Updown} 3600ms infinite;
    }
  }

  &.dust2 {
    // top: 600px;
    top: ${(props) => 580 + props.kuroTop / 2.85}px;
    // right: 10%;
    right: ${(props) => 10 + props.kuroTop / 50}%;
    animation: ${Rotate} 2000ms cubic-bezier(0.49, 0.76, 0.64, 0.42) infinite;
  }

  &.dust3 {
    top: 350px;
    left: 5%;
    animation: ${Updown} 2000ms infinite;
  }

  &.dust4 {
    // top: 60px;
    top: ${(props) => props.kuroTop + 60 - 75}px;
    // left: 15%;
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
