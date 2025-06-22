import * as THREE from 'three';

export function createProduct(scene) {
  const group = new THREE.Group();

  const woodMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('../texture/texture.jpg'),
    roughness: 0.6,
    metalness: 0.1,
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('../texture/metal_texture.jpg'),
    roughness: 0.3,
    metalness: 0.8,
  });

  const tableTop = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.2, 2),
    woodMaterial
  );
  tableTop.position.y = 1;
  group.add(tableTop);

  const legGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
  const legPositions = [
    [-1.9, 0.5, -0.9],
    [1.9, 0.5, -0.9],
    [-1.9, 0.5, 0.9],
    [1.9, 0.5, 0.9],
  ];
  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, woodMaterial);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  // Lamp base
  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32),
    metalMaterial
  );
  lampBase.position.set(0, 1.15, 0);
  lampBase.castShadow = true;
  lampBase.receiveShadow = true;
  group.add(lampBase);

  // === FIRST (STRAIGHT) LAMP STAND ===
  const lampStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1, 16),
    metalMaterial
  );
  lampStand.geometry.translate(0, 0.5, 0); // base at y=0

  const pivot = new THREE.Group();
  pivot.position.set(0, 1.15, 0); // base position
  const angle = 1/4 * Math.PI - 0.3;
  pivot.rotation.z = angle;
  pivot.add(lampStand);
  group.add(pivot);

  // Find top of first lamp stand
  const topOfFirstRod = new THREE.Vector3(0, 1, 0); // local top point
  lampStand.localToWorld(topOfFirstRod.clone()); // this will apply the pivot transform too
  pivot.localToWorld(topOfFirstRod); // get final world position

  const joint = new THREE.SphereGeometry(0.08, 16, 16);
  const jointMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.5,
    metalness: 0.5,
  });
  const jointMesh = new THREE.Mesh(joint, jointMaterial);
  jointMesh.position.copy(topOfFirstRod);  
  group.add(jointMesh);  
       

 
  
  const slantedLampStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.5, 16),
    metalMaterial
  );
  slantedLampStand.geometry.translate(0, 0.75, 0); // base at y=0
  

  const slantedPivot = new THREE.Group();
  slantedPivot.position.copy(topOfFirstRod); // attach to top of first
  const slantedAngle = -1/4 * Math.PI;
  slantedPivot.rotation.z = slantedAngle;
  slantedPivot.add(slantedLampStand);
  group.add(slantedPivot);



  // Find top of slanted lamp stand
  const topOfSecondRod = new THREE.Vector3(0, 1.5, 0);
  slantedLampStand.localToWorld(topOfSecondRod.clone());
  slantedPivot.localToWorld(topOfSecondRod);

  const slantedJoint = jointMesh.clone()
  
  slantedJoint.position.copy(topOfSecondRod);

  group.add(slantedJoint);

  // === LAMP SHADE ===
  const lampShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.4, 0.5, 32),
    new THREE.MeshStandardMaterial({
      color: 0xfff7e1,
      roughness: 0.4,
      metalness: 0,
      transparent: true,
      opacity: 0.9,
    })
  );
  let lampShade_position = {
    x: topOfSecondRod.x,
    y: topOfSecondRod.y - 0.25, // position it above the top of the second rod so we need to take half of the hight of the cone
    z: topOfSecondRod.z,
  }
  lampShade.position.set(lampShade_position.x, lampShade_position.y, lampShade_position.z);
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.intensity = 2;          
  spotLight.angle = Math.PI / 2;    
  spotLight.penumbra = 0.5;         
  spotLight.decay = 1;              
  spotLight.distance = 10;          

  spotLight.position.set(lampShade_position.x, lampShade_position.y + 0.5, lampShade_position.z);
  group.add(spotLight);
  group.add(spotLight.target);

  group.add(lampShade);
  scene.add(group);
  return group;
}
