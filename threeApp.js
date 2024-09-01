import * as Three from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

const camera = new Three.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 0.1,1000);
const renderer = new Three.WebGLRenderer();
const scene = new Three.Scene();

renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement);

const geometry = new Three.BoxGeometry(1,1,1);
const material = new  Three.MeshBasicMaterial({color: 0x800080})
const cube = new Three.Mesh(geometry,material);

const planeGeometry = new Three.BoxGeometry(10,0,20);
const planeMaterial = new Three.MeshBasicMaterial({color:0xD3D3D3});
const plane = new Three.Mesh(planeGeometry,planeMaterial);
plane.position.z = -5;
scene.add(plane);

const gltfLoader = new GLTFLoader();
const bridgeMaterial =new Three.MeshBasicMaterial({color:  0x00ff00})
let bridge;

function initBridges (){

gltfLoader.load(("res/bridge/bridge.gltf"),(gltfObj) => {
  gltfObj.scene.traverse((child) => {
    if (child.isMesh){
      child.material = bridgeMaterial;
    }
  })
  gltfObj.scene.scale.set(2.1,2.1,2.1);
  gltfObj.scene.position.z =-10;
  bridge = gltfObj.scene;
})}

initBridges();


camera.position.z = 7;
camera.position.x = 0;
camera.position.y = 2.5;
cube.position.z =4;
scene.add(cube);

const grid = new Three.GridHelper(10,10);
scene.add(grid);

const axis = new Three.AxesHelper(10);
scene.add(axis);

camera.lookAt(0,2,5);


window.addEventListener("keydown",(e) =>{
  if (e.key =="a" && cube.position.x > -3.5){
    cube.position.x -=3.5;
    console.log(cube.position);
  }
  if(e.key =="d" && cube.position.x < 3.5){
    cube.position.x +=3.5;
    console.log(cube.position);
  }

})

function moveBridges(bridge){
  if ( bridge.position.z < 4.4){
    bridge.position.z +=2;}
    else {
      scene.r
    }


}



function animate(){
  renderer.render(scene,camera);
  cube.rotation.x +=0.01;
  requestAnimationFrame(animate);
}

animate();

