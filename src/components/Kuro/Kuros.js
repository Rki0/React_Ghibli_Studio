import React from "react";

import NotMoveKuro from "./NotMoveKuro";
import MoveKuro from "./MoveKuro";

function Kuros({ kuroTop }) {
  // kuroTop을 Kuros의 부모 컴포넌트에서 받아오기 때문에
  // NotMoveKuro까지 리렌더링이 되고 있다.
  // 이를 막으려면, kuroTop과 setKuroTop을 이 컴포넌트 내부에서 진행해주는게 나을 것이다.

  return (
    <React.Fragment>
      <NotMoveKuro />

      <MoveKuro kuroTop={kuroTop} />
    </React.Fragment>
  );
}

export default React.memo(Kuros);
