
// ThreeScene.tsx

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { initCamera } from '../treeComp/camera';
import { initRenderer, renderScene } from '../treeComp/renderer';
import { loadShader } from '../treeComp/shadersLoad';
import CubeComponent from '../treeComp/cubeComp';
import handleKeyDown from './cameraControls'; // Import the camera movement controls


const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [cubeComponent, setCubeComponent] = useState<CubeComponent | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cubeRef = useRef<CubeComponent>();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up camera
    const camera = initCamera();
    cameraRef.current = camera;
    // Set up renderer and scene
    const { renderer, scene } = initRenderer(canvasRef.current);

    // Load shaders
    loadShader().then(({ vertexshader, fragmentShader }) => {
      // Create components
      const newCubeComponent = new CubeComponent(scene, vertexshader, fragmentShader);
      cubeRef.current = newCubeComponent;
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        newCubeComponent.update();
        renderScene(scene, camera, renderer);
      };

      animate();

      // Resize handling
      const handleResize = () => {
        const { clientWidth, clientHeight } = canvasRef.current!;
        const layoutHeight = window.innerHeight; // Get layout height
        const maxHeight = Math.min(layoutHeight, clientHeight); // Calculate max height
        const aspectRatio = clientWidth / maxHeight; // Maintain aspect ratio
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, maxHeight);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize size

      // Camera movement controls
      const handleKeyDownEvent = (event: KeyboardEvent) => {
        if (!cameraRef.current) return;
        const camera = cameraRef.current;
        const moveSpeed = 0.1; // Adjust as needed
        handleKeyDown(event, camera, moveSpeed);
      };
      window.addEventListener('keydown', handleKeyDownEvent);
      
      // Mouse interaction
      const handleMouseDown = (event: MouseEvent) => {
        console.log("test")// Toggle cube rotation on mouse down
        if (!cubeRef.current) return;
        cubeRef.current.toggleRotation();
      };

      const handleMouseUp = () => {
        if (!cubeRef.current) return;
        cubeRef.current.toggleRotation(); // Toggle cube rotation off on mouse up
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!cubeRef.current) return;
        const { movementX, movementY } = event;
        cubeRef.current.rotateCube(movementX, movementY); // Rotate cube based on mouse movement
      };

      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      canvasRef.current.addEventListener('mousemove', handleMouseMove);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyDownEvent);
        window.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current?.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
        renderer.dispose();
      };
    });
  }, []);

  const handleToggleWireframe = () => {
    if (cubeComponent) {
      cubeComponent.toggleWireframe();
    }
  };

  return (
    <div ref={canvasRef} style={{ width: '100%', maxHeight: '100%', overflow: 'hidden' }}>
      <button onClick={handleToggleWireframe} className='zIndex: 3' >Toggle Wireframe</button>
    </div>
  );
};

export default ThreeScene;
