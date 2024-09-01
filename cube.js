import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function imCubeRotate(cube){
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;
}

export function imCubeMoments(cube){

  document.addEventListener(("keypress"),(e) => {
    if ( e.key == "a" && cube.position.x > -4.5){
      cube.position.x -= 4.5;
    }
    if ( e.key == "d" && cube.position.x <4.5){
      cube.position.x += 4.5;
    }
  })
}

export function imInitBridge(gltfLoader,callback){
  gltfLoader.load("./res/bridge/bridge.gltf",(gltfObj) =>{
    callback(gltfObj);
  })
}