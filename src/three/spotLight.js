import { SpotLight } from 'three';

export function getSpotLight(intensity, color) {
  color = color === undefined ? 'rgb(255, 255, 255)' : color;
  const light = new SpotLight(color, intensity);
  light.castShadow = true;
  light.penumbra = 0.5;
  return light;
}
