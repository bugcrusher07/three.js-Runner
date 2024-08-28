import * as Three from 'three';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1 , 1000);

const renderer = new Three.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry(1,1,1);
const material= new MeshBasicMaterial({color:0x800080})
const cube = new Three.Mesh(geometry, material);

scene.add(cube);

camera.position.z =5;

function animate(){
  renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);
