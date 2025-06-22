
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';


export function initScene() {
  const container = document.querySelector("#canvas_")
  const scene = new THREE.Scene() //initialized the scene this where all the observable components fit in
   const rgbeloader = new EXRLoader();
  rgbeloader.load('../texture/room.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });
  scene.background = new THREE.Color(0xeeeeee); //set the background color to light grey
 
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
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  // this might be necessary to set the controls to allow free movement around the table
 


  controls.update();

  //just in case the window resized

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  

  return { scene, camera, renderer, controls };
}
