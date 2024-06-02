
// camera.ts

import * as THREE from 'three';

export const initCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  return camera;
};

