import React from "react";
import styled, { keyframes } from "styled-components";

function Logo(props) {
  return (
    <LogoWrapper scrollForTop={props.scrollForTop}>
      <LogoImg
        src={process.env.PUBLIC_URL + "/assets/Ghibli_Logo.png"}
        alt="logo"
        scrollTop={props.scrollTop}
      />
    </LogoWrapper>
  );
}

export default React.memo(Logo);

const ShowLogo = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LogoWrapper = styled.div.attrs((props) => ({
  style: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    top: `${props.scrollForTop}px`,
  },
}))`
  animation: ${ShowLogo} 1000ms ease-in-out;
`;

const LogoImg = styled.img.attrs((props) => ({
  style: {
    display: "block",
    minWidth: "500px",
    maxWidth: "1000px",
    height: "auto",
    width: `${1000 - props.scrollTop}px`,
  },
}))``;
