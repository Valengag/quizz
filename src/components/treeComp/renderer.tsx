
// renderer.ts

import * as THREE from 'three';

export const initRenderer = (container: HTMLElement): { renderer: THREE.WebGLRenderer, scene: THREE.Scene } => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  return { renderer, scene };
};

export const renderScene = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void => {
  renderer.render(scene, camera);
};

