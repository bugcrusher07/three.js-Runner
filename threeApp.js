 import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();o

const camera = new THREE.PerspectiveCamera(100,window.innerWidth/window.innerHeight , 0.1 , 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry,material);


const gltfLoader = new GLTFLoader();
gltfLoader.load("./res/FPS_player.gltf",(gltfScene) => {
  scene.add(gltfScene);
})

camera.position.z =5;

function animate(){
  cube.rotation.x +=0.01;
  cube.rotation.y +=0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);