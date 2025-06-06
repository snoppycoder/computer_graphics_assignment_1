
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
  //A notworthy thing when setting up the table's leg I used a sort of formula taking the origin going
  // half distance of the height/length then adding / subtracting an offset mostly 10-20 will make it perfect
  const positions = [
    [-0.9, 0.5, -0.9],
    [0.9, 0.5, -0.9],
    [-0.9, 0.5, 0.9],
    [0.9, 0.5, 0.9],
  ];
  //I basially assigned the position to the legs and made legMaterial in the loop to avoid repetition
  for (const [x, y, z] of positions) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 1),
      legMaterial
    );
    leg.position.set(x, y, z);
    //finally added to the group gluing it together!
    group.add(leg);
  }
//adding everything we did up until now to the scene and returning the group to basically our main.js

  scene.add(group);
  return group;
}
