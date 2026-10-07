import * as THREE from "three";

import { Sky } from "three/addons/objects/Sky.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import GUI from "lil-gui";
import { normalMap } from "three/tsl";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 10;
camera.position.y = 3;
camera.position.z = 3;
const scene = new THREE.Scene();

scene.add(camera);

const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//
const textureLoader = new THREE.TextureLoader();
const texturePath = `${import.meta.env.BASE_URL}Textures/`;
textureLoader.setPath(texturePath);
const exrLoader = new EXRLoader();
exrLoader.setPath(texturePath);

const floorGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);

const floorDisplacementTexture = textureLoader.load(
  "Floor_Texture/rocky_terrain_02_disp_1k.png",
);
const floorColorTexture = textureLoader.load(
  "Floor_Texture/rocky_terrain_02_diff_1k.jpg",
);
const floorRoughnessTexture = exrLoader.load(
  "Floor_Texture/rocky_terrain_02_rough_1k.exr",
);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floor = new THREE.Mesh(
  floorGeometry,
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    displacementMap: floorDisplacementTexture,
    transparent: true,
    roughnessMap: floorRoughnessTexture,
    displacementScale: 0.2,
  }),
);
floor.rotation.x = -Math.PI * 0.5;

floorColorTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);
floorRoughnessTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;
floorRoughnessTexture.wrapS = THREE.RepeatWrapping;
floorRoughnessTexture.wrapT = THREE.RepeatWrapping;
scene.add(floor);

//
const ambientLight = new THREE.AmbientLight("#8bd8ff", 1);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight("#ffffff", 2);
directionLight.position.set(2, 2, -8);
scene.add(directionLight);

const hemisphereLight = new THREE.HemisphereLight(0x16d098, 0x0000ff, 0.9);
scene.add(hemisphereLight);
//
//Texture
const wallColorTexture = textureLoader.load(
  "Wall_Texture/plastered_wall_05_diff_1k.jpg",
);
const wallNormalTexture = exrLoader.load(
  "Wall_Texture/plastered_wall_05_nor_gl_1k.exr",
);
const wallRoughnessTexture = exrLoader.load(
  "Wall_Texture/plastered_wall_05_rough_1k.exr",
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallColorTexture,
  roughnessMap: wallRoughnessTexture,
  normalMap: wallNormalTexture,
});

wallColorTexture.repeat.set(8, 8);
wallColorTexture.wrapS = THREE.RepeatWrapping;
wallColorTexture.wrapT = THREE.RepeatWrapping;

wallRoughnessTexture.repeat.set(8, 8);
wallRoughnessTexture.wrapS = THREE.RepeatWrapping;
wallRoughnessTexture.wrapT = THREE.RepeatWrapping;
//
const building = new THREE.Group();

const House_Walls = new THREE.Mesh(
  new THREE.BoxGeometry(8, 4, 8),
  wallMaterial,
);
House_Walls.position.set(0, 2, 0);
building.add(House_Walls);

const roofColourTexture = textureLoader.load(
  "Roof/clay_roof_tiles_03_diff_1k.jpg",
);
const roofNormalTexture = exrLoader.load(
  "Roof/clay_roof_tiles_03_nor_gl_1k.exr",
);
const roofRoughnessTexture = exrLoader.load(
  "Roof/clay_roof_tiles_03_rough_1k.exr",
);
roofColourTexture.colorSpace = THREE.SRGBColorSpace;

const roofMaterial = new THREE.MeshStandardMaterial({
  map: roofColourTexture,
  roughnessMap: roofRoughnessTexture,
  normalMap: roofNormalTexture,
});
roofColourTexture.repeat.set(8, 8);
roofNormalTexture.repeat.set(8, 8);
roofRoughnessTexture.repeat.set(8, 8);

roofColourTexture.wrapS = THREE.RepeatWrapping;
roofColourTexture.wrapT = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapT = THREE.RepeatWrapping;
roofRoughnessTexture.wrapS = THREE.RepeatWrapping;
roofRoughnessTexture.wrapT = THREE.RepeatWrapping;

const House_Roof = new THREE.Mesh(
  new THREE.ConeGeometry(7, 4, 4),
  roofMaterial,
);
House_Roof.rotation.y = Math.PI * 0.25;
House_Roof.position.set(0, 6, 0);
building.add(House_Roof);

const doorColorTexture = textureLoader.load("door/color.jpg");
const doorAlphaTexture = textureLoader.load("door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("door/height.jpg");
const doorNormalTexture = textureLoader.load("door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "door/roughness.jpg",
);

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const doorGeometry = new THREE.PlaneGeometry(3, 3.5, 100, 100);

const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  transparent: true,
  alphaMap: doorAlphaTexture,
  aoMap: doorAmbientOcclusionTexture,
  displacementMap: doorHeightTexture,
  normalMap: doorNormalTexture,
  metalnessMap: doorMetalnessTexture,
  roughnessMap: doorRoughnessTexture,
  displacementScale: 0.15,
  displacementBias: -0.04,
  side: THREE.DoubleSide,
});

const House_Door_Left = new THREE.Mesh(doorGeometry, doorMaterial);

House_Door_Left.position.set(-4.1, 1.5, 1.5);
House_Door_Left.rotation.y = Math.PI * 0.5;

building.add(House_Door_Left);
//
const House_Door_right = new THREE.Mesh(doorGeometry, doorMaterial);

House_Door_right.position.set(-4.1, 1.5, -1.5);
House_Door_right.rotation.y = -Math.PI * 0.5;
building.add(House_Door_right);

const Balcony_Door_ColorTexture = textureLoader.load(
  "Test/rusty_metal_diff_1k.jpg",
);
const Balcony_Door_NormalTexture = exrLoader.load(
  "Test/rusty_metal_nor_gl_1k.exr",
);
const Balcony_Door_RoughtnessTexture = textureLoader.load(
  "Test/rusty_metal_rough_1k.jpg",
);

Balcony_Door_ColorTexture.colorSpace = THREE.SRGBColorSpace;

const Balcony_Door_Material = new THREE.MeshStandardMaterial({
  map: Balcony_Door_ColorTexture,
  roughnessMap: Balcony_Door_RoughtnessTexture,
  normalMap: Balcony_Door_NormalTexture,
});

const Balcony_Door = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 3, 3.5),
  Balcony_Door_Material,
);

Balcony_Door.position.set(4.01, 1.5, 0);

building.add(Balcony_Door);

scene.add(building);

//Home_Balcony
const Balcony_Color_Texture = textureLoader.load(
  "Balcony/beige_wall_001_diff_1k.jpg",
);
const Balcony_Normal_Texture = exrLoader.load(
  "Balcony/beige_wall_001_nor_gl_1k.exr",
);
const Balcony_Roughtness_Texture = textureLoader.load(
  "Balcony/beige_wall_001_rough_1k.jpg",
);
Balcony_Color_Texture.colorSpace = THREE.SRGBColorSpace;

const Balcony_Material = new THREE.MeshStandardMaterial({
  map: Balcony_Color_Texture,
  normalMap: Balcony_Normal_Texture,
  roughnessMap: Balcony_Roughtness_Texture,
});

const Home_Balcony = new THREE.Group();

const Home_Balcony_Floor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 4),
  Balcony_Material,
);
Home_Balcony_Floor.position.set(5, 0, 0);
Home_Balcony.add(Home_Balcony_Floor);
const Home_Balcony_Fence_right = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 0.1),
  Balcony_Material,
);
const Home_Balcony_Fence_left = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 0.1),
  Balcony_Material,
);
const Home_Balcony_Fence_front = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 1, 4),
  Balcony_Material,
);
const Home_Balcony_Fence_bottom = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 4),
  Balcony_Material,
);

Home_Balcony_Fence_right.position.set(5, 0.5, -2);
Home_Balcony_Fence_left.position.set(5, 0.5, 2);
Home_Balcony_Fence_front.position.set(6, 0.5, 0);
Home_Balcony_Fence_bottom.position.set(5, 0.25, 0);
Home_Balcony.add(Home_Balcony_Fence_right);
Home_Balcony.add(Home_Balcony_Fence_left);
Home_Balcony.add(Home_Balcony_Fence_front);
Home_Balcony.add(Home_Balcony_Fence_bottom);
scene.add(Home_Balcony);
//Fences around house

const fences = new THREE.Group();

const fencesGeometry = new THREE.BoxGeometry(0.25, 1, 0.5);
const fenceMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(11, 245, 194)",
});

const fence1 = new THREE.Mesh(fencesGeometry, fenceMaterial);
fence1.position.set(7, 0.5, 7);
const fence2 = new THREE.Mesh(fencesGeometry, fenceMaterial);
fence2.position.set(-7, 0.5, 7);
const fence3 = new THREE.Mesh(fencesGeometry, fenceMaterial);
fence3.position.set(-7, 0.5, -7);
const fence4 = new THREE.Mesh(fencesGeometry, fenceMaterial);
fence4.position.set(7, 0.5, -7);

fences.add(fence1, fence2, fence3, fence4);
scene.add(fences);
//random stuff

const chickens = new THREE.Group();
scene.add(chickens);
const chickensGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
const chickensMaterial = new THREE.MeshStandardMaterial({ color: "#dddddd" });

for (let i = 0; i < Math.round(Math.random() * 3 + 1); i++) {
  const x = Math.random() * 4 - 9;
  const z = Math.random() * 16 - 8;
  const chicken = new THREE.Mesh(chickensGeometry, chickensMaterial);
  chicken.position.set(x, 0.5, z); //   chicken.rotation.y = Math.random() * 4;
  //   chicken.rotation.z = Math.random() * 4;
  chickens.add(chicken);
}
//
const fairys = new THREE.Group();
const fairy1 = new THREE.PointLight("#ff00ff", 10, 3);
const fairy2 = new THREE.PointLight("#0bf11a", 2, 2);
const fairy3 = new THREE.PointLight("#ffea00", 3, 1);

fairys.add(fairy1, fairy2, fairy3);
fairy3.position.set(5, 4.5, -2);
fairy2.position.set(5, 4.5, 2);
fairy1.position.set(-4, 5.5, 1.5);
scene.add(fairys);
//
//
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
directionLight.castShadow = true;
fairy1.castShadow = true;
fairy2.castShadow = true;
fairy3.castShadow = true;

floor.receiveShadow = true;

House_Walls.castShadow = true;
House_Walls.receiveShadow = true;
// roofMaterial.castShadow = true;

for (const chicken of chickens.children) {
  chicken.castShadow = true;
  chicken.receiveShadow = true;
}
//

scene.fog = new THREE.FogExp2("#060032", 0.1);
//
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//
const sky = new Sky();

sky.scale.set(100, 100, 100);

scene.add(sky);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.1, 0.1, -0.9);
//
//

export const gui = new GUI({
  title: "GUI",
});
const buildingFolder = gui.addFolder("Building");
const EnviormentFolder = gui.addFolder("Enviorment");
const LightsFolder = gui.addFolder("Lights");

// buildingFolder.add(ambientLight, "intensity").min(0).max(3).step(0.001); //Also work
hemisphereLight;

EnviormentFolder.add(scene.fog, "density", 0, 0.5, 0.01).name("fog density");
EnviormentFolder.add(chickens, "visible").name("Show Chickens");
EnviormentFolder.add(fairys, "visible").name("Show Fairys");
LightsFolder.add(ambientLight, "visible").name("Show Ambient Light");
LightsFolder.add(ambientLight, "intensity", 0, 5, 0.01).name(
  "Ambient Light strength",
);
LightsFolder.add(directionLight, "intensity", 0, 5, 0.01).name(
  "Directional Light strength",
);
LightsFolder.add(hemisphereLight, "intensity")
  .min(0)
  .max(5)
  .step(0.001)
  .name("HemisphereLight intesity");
LightsFolder.addColor(hemisphereLight, "color")
  .onChange((value) => {
    console.log(value);
  })
  .min(0)
  .max(5)
  .step(0.001)
  .name("HemisphereLight colour");

buildingFolder.add(Home_Balcony, "visible").name("Show Balcony");
buildingFolder.add(building, "visible").name("Show Building");
buildingFolder
  .addColor(wallMaterial, "color")
  .onChange((value) => {
    console.log(value);
  })
  .name("Wall Color");
//
const timer = new Timer();

const tick = () => {
  timer.update();
  const elapsedTime = timer.getElapsed();

  const fairy1Angle = elapsedTime * 0.5;
  fairy1.position.x = Math.cos(fairy1Angle) * 9;
  fairy1.position.z = Math.sin(fairy1Angle) * 9;

  fairy1.position.y = Math.sin(elapsedTime * 3);

  const fairy2Angle = elapsedTime * 0.32;
  fairy2.position.x = Math.cos(fairy2Angle) * 9;
  fairy2.position.z = Math.sin(fairy2Angle) * 9;

  fairy2.position.y = Math.sin(elapsedTime * 2);

  const fairy3Angle = elapsedTime * 0.18;
  fairy3.position.x = Math.sin(fairy3Angle) * 9.5;
  fairy3.position.y = Math.sin(elapsedTime * 1);

  fairy3.position.z = Math.cos(fairy3Angle) * 3.5;
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
