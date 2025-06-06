
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initScene() {
  const container = document.querySelector("#canvas_")
  const scene = new THREE.Scene() //initialized the scene this where all the observable components fit in

  scene.background = new THREE.Color('skyblue');
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  //set up the camera used perspectiveCamera for realistic purpose 
  camera.position.set(0, 2, 5);
  //set the position to capture the whole table

  const renderer = new THREE.WebGLRenderer({ antialias: true }); // to reduce jagged up effect
  renderer.setSize(container.clientWidth, container.clientHeight); //set the size to my container div
  const controls = new OrbitControls(camera, renderer.domElement);
  container.append(renderer.domElement)
  controls.enableDamping = true;
  controls.target.set(0, 1, 0)

  //just in case the window resized

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  

  return { scene, camera, renderer, controls };
}
