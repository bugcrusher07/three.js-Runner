// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(100,window.innerWidth/window.innerHeight , 0.1 , 1000);
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement);
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({color:0x00ff00});
// const cube = new THREE.Mesh(geometry,material);


// const gltfLoader = new GLTFLoader();
// gltfLoader.load("./res/FPS_player.gltf",(gltfScene) => {
//   scene.add(gltfScene);
// })

// camera.position.z =5;

// function animate(){
//   cube.rotation.x +=0.01;
//   cube.rotation.y +=0.01;
//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const gltfLoader = new GLTFLoader();
// gltfLoader.load( "scene.gltf",
//   (gltf) => {
//     scene.add(gltf.scene);
//   },
//   (progress) => {
//     console.log("scene.gltf");
//     console.log((progress.loaded / progress.total * 100) + '% loaded');
//   },
//   (error) => {
//     console.error('An error happened', error);
//   console.log(error.stack);
// }
// );




// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }

// animate();
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Add axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const gltfLoader = new GLTFLoader();
gltfLoader.load("scene.gltf",
  (gltf) => {
    const model = gltf.scene;

    // Log model details
    console.log('Model loaded:', model);
    console.log('Model children:', model.children);

    // Get the bounding box of the model
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    console.log('Model size:', size);
    console.log('Model center:', center);

    // Adjust model scale based on its size
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;  // Scale to fit within a 5x5x5 cube
    model.scale.multiplyScalar(scale);

    // Center the model
    model.position.sub(center.multiplyScalar(scale));

    // Move the model up slightly
    model.position.y += 1;
    model.traverse((child) => {
  if (child.isMesh) {
    child.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  }
});

    scene.add(model);

    // Add a bounding box helper
    const boxHelper = new THREE.BoxHelper(model, 0xffff00);
    scene.add(boxHelper);

    console.log('Model added to scene');
  },
  (progress) => {
    console.log((progress.loaded / progress.total * 100) + '% loaded');
  },
  (error) => {
    console.error('An error happened', error);
    console.log(error.stack);
  }
);

camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Add window resize handler
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}