import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { imCubeRotate,imInitBridge,imCubeMoments } from "./cube";

let bridge;
const camera = new Three.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 0.1 , 1000);
const scene = new Three.Scene();
const renderer = new Three.WebGLRenderer();
const axes = new Three.AxesHelper(11);
const grid = new Three.GridHelper(10,10);
scene.add(grid);
scene.add(axes);

renderer.setSize(window.innerWidth , window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new Three.MeshBasicMaterial({color: 0x0000FF});
const geometry = new Three.BoxGeometry(1,1,1);
const cube = new Three.Mesh(geometry,material);
const gltfLoader = new GLTFLoader();

const planeMaterial = new Three.MeshBasicMaterial({color:0xD3D3D3});
const planeGeometry = new Three.PlaneGeometry(12,100);
const plane = new Three.Mesh(planeGeometry,planeMaterial);

camera.position.y =3;
camera.position.z =10;
plane.rotation.x =55;
camera.lookAt(cube.position);
plane.position.set(0,0,-45);
cube.position.set(0,0.5,5);

imInitBridge(gltfLoader,(loadedBridge) => {
  bridge = loadedBridge;
  scene.add(bridge.scene);
  console.log(bridge);
});


scene.add(cube);
scene.add(plane);

imCubeMoments(cube);

function animate(){
  imCubeRotate(cube);
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate();