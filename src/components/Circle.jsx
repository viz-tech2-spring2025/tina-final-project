import React from "react";
import { useSpring, animated } from "react-spring";

export default function Circle({
  x,
  y,
  r,
  fill,
  opacity = 1,
  stroke = "none",
  strokeWidth = 0,
  onMouseEnter,
  onMouseLeave,
}) {

  const springProps = useSpring({
    to: { 
      cx: x,
      cy: y, 
      r: r,
      opacity: opacity
    },
    config: { 
      mass: 10,
      tension: 200, 
      friction: 40 
    }
  });

  return (
    <animated.circle
      cx={springProps.cx}
      cy={springProps.cy}
      r={springProps.r}
      fill={fill}
      opacity={springProps.opacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
      style={{ cursor: "pointer" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}