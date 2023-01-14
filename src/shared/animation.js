import { keyframes } from "styled-components";

export const Rotate = keyframes`
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

export const Updown = keyframes`
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
