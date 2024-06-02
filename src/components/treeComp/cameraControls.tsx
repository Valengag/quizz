
// cameraControls.ts

import * as THREE from 'three';

const handleKeyDown = (event: KeyboardEvent, camera: THREE.PerspectiveCamera, moveSpeed: number) => {
  switch (event.key) {
    case 'w':
      camera.position.z -= moveSpeed;
      break;
    case 's':
      camera.position.z += moveSpeed;
      break;
    case 'a':
      camera.position.x -= moveSpeed;
      break;
    case 'd':
      camera.position.x += moveSpeed;
      break;
    case 'q':
      camera.position.y += moveSpeed;
      break;
    case 'e':
      camera.position.y -= moveSpeed;
      break;
    default:
      break;
  }
};

export default handleKeyDown;
