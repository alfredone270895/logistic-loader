import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Box3, Raycaster, Vector2, Vector3 } from 'three';

/**
 * Append dom element in three canvas
 */
export const append = async (renderer, scene, camera, controls) => {
  const documents = document.getElementById('loadergl');
  const { innerWidth, innerHeight } = window;
  documents.appendChild(renderer.domElement);
  window.threeElement = renderer.domElement;

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(innerWidth, innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);
  window.labelRendererElement = labelRenderer.domElement;

  const labelDiv = document.createElement('div');
  labelDiv.className = 'label';
  labelDiv.style.marginTop = '-1em';
  const label = new CSS2DObject(labelDiv);
  label.visible = false;
  scene.add(label);

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  documents.addEventListener('mousemove', ({ clientX, clientY }) => {
    const { innerWidth, innerHeight } = window;
    mouse.x = (clientX / innerWidth) * 2 - 1;
    mouse.y = -(clientY / innerHeight) * 2 + 1;
  });

  // Handle window resize
  documents.addEventListener('resize', () => {
    const { innerWidth, innerHeight } = window;

    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });

  renderer.setAnimationLoop(() => {
    controls.update();

    // Pick objects from view using normalized mouse coordinates
    raycaster.setFromCamera(mouse, camera);

    const [hovered] = raycaster.intersectObjects(scene.children);
    if (hovered) {
      // Setup label
      renderer.domElement.className = 'hovered';
      label.visible = true;
      if (hovered.object && hovered.object.name) {
        labelDiv.textContent = hovered.object.name;

        // Get offset from object's dimensions
        const offset = new Vector3();
        new Box3().setFromObject(hovered.object).getSize(offset);

        // Move label over hovered element
        label.position.set(hovered.object.position.x, offset.y / 2, hovered.object.position.x);
      }
    } else {
      // Reset label
      renderer.domElement.className = '';
      label.visible = false;
      labelDiv.textContent = '';
    }

    // Render scene
    renderer.render(scene, camera);

    // Render labels
    labelRenderer.render(scene, camera);
  });
};
