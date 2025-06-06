// scripts/handleInteraction.js
import * as THREE from 'three';

export function handleInteractions(scene, camera, renderer, productGroup) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      obj.material.color.set(Math.random() * 0xffffff);
    }
  }

  window.addEventListener('click', onClick);
}
