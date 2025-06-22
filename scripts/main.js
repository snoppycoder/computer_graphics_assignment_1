import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './lighting.js';
import * as THREE from 'three';
let scene, camera, renderer, productGroup, controls;
({ scene, camera, renderer, controls } = initScene());
productGroup = createProduct(scene);
addLighting(scene);
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


function animate() {
  // productGroup.rotation.y += 0.003
 
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
