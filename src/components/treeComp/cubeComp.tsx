
// components/CubeComponent.ts

import * as THREE from 'three';

export default class CubeComponent {
  private mesh: THREE.Mesh;
  private material: THREE.Material;
  private isRotating: boolean;
  private rotationSpeed: number;

  constructor(scene: THREE.Scene, vertexShader: string, fragmentShader: string) {
    const geometry = new THREE.BoxGeometry();
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x00ff00) }
      },
      vertexShader,
      fragmentShader,
      wireframe: false // Initial wireframe visibility
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    scene.add(this.mesh);

    this.isRotating = false;
    this.rotationSpeed = 0.01; // Adjust as needed
  }

  public toggleWireframe(): void {
    this.material.wireframe = !this.material.wireframe;
  }

  public toggleRotation(): void {
    this.isRotating = !this.isRotating;
  }

  public rotateCube(movementX: number, movementY: number): void {
    if (!this.isRotating) return;

    const rotationSpeed = this.rotationSpeed;

    // Rotate the cube around its y-axis based on horizontal mouse movement
    this.mesh.rotation.y += movementX * rotationSpeed;

    // Rotate the cube around its x-axis based on vertical mouse movement
    this.mesh.rotation.x += movementY * rotationSpeed;
  }

  public update(): void {
  }
}

