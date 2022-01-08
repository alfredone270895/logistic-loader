/**
 * Responsive resize
 */
export function onWindowResize(camera, renderer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

/**
 * Rendering the canvas
 */
export const render = (scene, camera, renderer) => {
  renderer.render(scene, camera);
};
