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

camera.position.z = 7;
camera.position.x = 0;
camera.position.y = 2.5;
cube.position.z =4;
scene.add(cube);

const grid = new Three.GridHelper(10,10);
scene.add(grid);


camera.lookAt(cube.position)


window.addEventListener("keydown",(e) =>{
  if ( cube.position.z<= 10 && cube.position.z >= -5 ){
    switch
  }
})



function animate(){

  renderer.render(scene,camera);
  cube.rotation.x +=0.01;
  requestAnimationFrame(animate);
}

animate();