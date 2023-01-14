import { useState } from "react";
import styled from "styled-components";
import { IoEarthOutline } from "react-icons/io5";

function LangToggleBtn({ setLang }) {
  const [toggleBtn, setToggleBtn] = useState(false);

  const showLang = () => {
    setToggleBtn((prev) => !prev);
  };

  return (
    <StyledDiv>
      <StyledBtn onClick={showLang} toggleBtn={toggleBtn}>
        <IoEarthOutline size={30} />
      </StyledBtn>
      <StyledUl className={toggleBtn ? "active" : null}>
        <li>
          <button
            onClick={() => {
              setLang(0);
              showLang();
            }}
          >
            KR
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLang(1);
              showLang();
            }}
          >
            JP
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLang(2);
              showLang();
            }}
          >
            ENG
          </button>
        </li>
      </StyledUl>
    </StyledDiv>
  );
}

export default LangToggleBtn;

const StyledDiv = styled.div`
  position: absolute;
  top: 1220px;
  left: 20px;
  z-index: 100;
`;

const StyledBtn = styled.button`
  all: unset;
  position: absolute;
  cursor: pointer;
  width: 40px;
  height: 35px;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  position: absolute;
  top: -12.5px;
  left: 30px;
  display: flex;
  color: transparent;
  width: 100px;
  justify-content: space-between;

  // z-index를 StyledBtn이랑 같은 값으로 줬더니 겹쳐져서 버튼 클릭에 방해가 되는 상황 발생
  // 1정도 줄이면 transition 효과도 유지하고, display도 안 건드리면서 StyledBtn까지 살릴 수 있음.
  z-index: 99;
  transition: all 500ms ease-in-out;

  &.active {
    color: black;
    left: 50px;
  }

  button {
    all: unset;
    cursor: pointer;
  }
`;
