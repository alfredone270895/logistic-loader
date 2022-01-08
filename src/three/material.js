/**
 * cambio il tipo di materiale del blocco
 * @param type
 * @param color
 * @return {MeshBasicMaterial|MeshLambertMaterial|MeshPhongMaterial|MeshStandardMaterial}
 */
export function getMaterial(type, color) {
  let selectedMaterial;
  let materialOptions = {
    color: color === undefined ? 'rgb(255, 255, 255)' : color
  };
  switch (type) {
    case 'basic':
      selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
      break;
    case 'lambert':
      selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
      break;
    case 'phong':
      selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
      break;
    case 'standard':
      selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
      break;
    default:
      selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
      break;
  }
  return selectedMaterial;
}
