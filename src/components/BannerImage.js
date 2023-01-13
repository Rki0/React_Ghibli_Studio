import React from "react";
import styled from "styled-components";

function BannerImage() {
  return (
    <BannerImg
      src="https://ghibli-park.jp/site/img/index/main3.jpg"
      alt="banner"
    />
  );
}

export default React.memo(BannerImage);

const BannerImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;
