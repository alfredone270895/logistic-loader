import { PerspectiveCamera, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onWindowResize } from '../three/responsive';

/**
 * Setting camera
 */
export const setCamera = async () => {
  const camera = new PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.z = 20;
  camera.position.x = 0;
  camera.position.y = 5;
  camera.lookAt(new Vector3(0, 0, 0));

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener('resize', onWindowResize);
  return {
    camera,
    renderer,
    controls
  };
};
