import React from "react";
import styled from "styled-components";

const MainDiv = React.forwardRef((props, ref) => {
  return <TopDiv ref={ref}>{props.children}</TopDiv>;
});

export default React.memo(MainDiv);

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
