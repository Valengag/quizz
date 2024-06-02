
import React, { useState, useEffect } from 'react';

const Ball = ({ initialPosition, gravityIn, onPositionChange, yLine, playsound }) => {
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const gravity = gravityIn;
  const bounce = -1;
  const friction = 1;

  useEffect(() => {

    const handleAnimationFrame = () => {
      let newVelocity = { ...velocity };
      let newPosition = { ...position };

      // Update velocity due to gravity
      newVelocity.y += gravity;

      // Update position based on velocity
      newPosition.x += newVelocity.x;
      newPosition.y += newVelocity.y;

      // Map initialPosition.y to a higher pitch

      // Check for collision with bottom of screen and if collisionDetected is true
      if (newPosition.y >= yLine + 1) {
        newPosition.y = yLine ;
        newVelocity.y *= bounce;
        playsound()
      }

      // Update position and velocity
      setPosition(newPosition);
      setVelocity({ x: newVelocity.x * friction, y: newVelocity.y * friction });

      // Callback to notify parent component of position change
      onPositionChange(newPosition);
    };

    const animationId = requestAnimationFrame(handleAnimationFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [position, velocity, onPositionChange, gravity, bounce, friction, yLine]);

  // Function to map initialPosition.y to a higher pitch
   return (
    <div
      className="w-12 h-12 bg-red-500 rounded-full inline-block absolute"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    />
  );
};

export default Ball;

