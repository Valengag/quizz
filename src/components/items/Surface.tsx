
import React, { useEffect, useState } from 'react';
import Line from './Line';

const Surface = ({ width, height, lineY, ballPosition, onCollision }) => {
  const [isCollision, setIsCollision] = useState(false);

  useEffect(() => {
    // Check for collision with the line
    const collisionThreshold = 0; // Adjust as needed
    if (ballPosition.y + 6 >= lineY - collisionThreshold && ballPosition.y - 6 <= lineY + collisionThreshold) {
      setIsCollision(true);
      onCollision(); // Call the collision handler
    } else {
      setIsCollision(false);
    }
  }, [ballPosition, lineY, onCollision]);

  return (
    <svg width={800} height={800}>
      <Line x1={0} y1={lineY} x2={width} y2={lineY} isCollision={isCollision} />
    </svg>
  );
};

export default Surface;

