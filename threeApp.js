import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { imCubeRotate,imInitBridge,imCubeMoments } from "./cube";

let bridge;
const camera = new Three.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 0.1 , 1000);
const scene = new Three.Scene();
const renderer = new Three.WebGLRenderer();

camera.position.z +=5;
renderer.setSize(window.innerWidth , window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new Three.MeshBasicMaterial({color: 0x0000FF});
const geometry = new Three.BoxGeometry(1,1,1);
const cube = new Three.Mesh(geometry,material);

const planeMaterial = new Three.MeshBasicMaterial({color:0xD3D3D3});
const planeGeometry = new Three.PlaneGeometry(12,60,1);
const plane = new Three.Mesh(planeGeometry,planeMaterial);

camera.position.y =-5;
camera.position.x =0;
camera.position.z =4;

camera.lookAt(cube.position);
plane.position.set(0,14,0);
cube.position.set(0,-2,0.04);
imInitBridge(bridge);
if(bridge){
console.log("bridge made bruv")}else{
  console.log("nah");
}
bridge.scene.position.set(0,-1,0);
scene.add(bridge.scene);
scene.add(cube);
scene.add(plane);

imCubeMoments(cube);

function animate(){
  imCubeRotate(cube);
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate();