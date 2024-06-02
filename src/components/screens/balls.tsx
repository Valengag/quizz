
import React, { useRef, useEffect, useState } from 'react';
import Ball from '../items/ball';
import Surface from '../items/Surface';
import * as Tone from 'tone';

const Balls = () => {
  const containerRef = useRef(null);
  const [containerX, setContainerX] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [collisionDetected, setCollisionDetected] = useState(false);
  const [ gravity, setGravity] = useState(1)

  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setContainerX(containerRect.x);
    }
  }, []);

  useEffect(() => {
    if (containerX !== 0) {
      setIsReady(true);
    }
  }, [containerX]);

  const handleBallPositionChange = (position) => {
    setBallPosition(position);
  };

  const handleCollision = () => {
    setCollisionDetected(true);
  };

  const decrGra = () => {
   setGravity(gravity-0.25)
    
  }
  const incrGra = () => {
   setGravity(gravity+0.25)
    
  }
  const playSound = () => {

    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttack("C4",now);
    synth.triggerRelease(now+0.001)
  };

  return (
    <div className="flex">
      <div ref={containerRef}></div>
      {isReady && (
        <>
          <Ball initialPosition={{ x: containerX + 100, y: 100 }} gravityIn={gravity} onPositionChange={handleBallPositionChange} yLine={550} playsound={playSound}/>
          <Surface width={window.innerWidth} height={800} lineY={550} ballPosition={ballPosition} onCollision={handleCollision} />
        </>
      )}
      <button onClick={decrGra} > decr </button>
      <button onClick={incrGra} > incr </button>
    </div>
  );
};

export default Balls;

