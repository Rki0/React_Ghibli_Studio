import React from "react";
import styled from "styled-components";
import BannerImage from "./BannerImage";

function MainBanner() {
  return (
    <BannerDiv>
      <BannerImage />
    </BannerDiv>
  );
}

export default React.memo(MainBanner);

const BannerDiv = styled.div`
  margin-bottom: 305px;
`;
