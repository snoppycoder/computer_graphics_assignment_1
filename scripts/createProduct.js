// // scripts/createProduct.js
 import * as THREE from 'three';

export function createProduct(scene) {
  const group = new THREE.Group();

  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.2, 2),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  seat.position.y = 1;
  group.add(seat);

  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
  const positions = [
    [-0.9, 0.5, -0.9],
    [0.9, 0.5, -0.9],
    [-0.9, 0.5, 0.9],
    [0.9, 0.5, 0.9],
  ];
  for (const [x, y, z] of positions) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 1),
      legMaterial
    );
    leg.position.set(x, y, z);
    group.add(leg);
  }

  scene.add(group);
  return group;
}
