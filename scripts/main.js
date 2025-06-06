import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './lighting.js';
let scene, camera, renderer, productGroup, controls;
({ scene, camera, renderer, controls } = initScene());
productGroup = createProduct(scene);
addLighting(scene);

function animate() {
  productGroup.rotation.y += 0.003
 
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
