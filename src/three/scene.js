/*
 * Copyright (c) 2022 Alfredo Dallari Sergio.
 * The MIT License (MIT)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal  in the Software without restriction, including without limitation the rights  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  Color,
  DirectionalLight,
  Fog,
  Mesh,
  MeshPhongMaterial,
  PlaneBufferGeometry,
  Scene,
  TextureLoader
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { generateCollies } from '../three/collies';
import { getSpotLight } from '../three/spotLight';

/**
 * Switch type of transport unit
 * @param transportUnit
 * @return {{ldm: number, width: number, length: number, weight: number, title: string, height: number, cbm: number}}
 */
const switchTransportUnit = (transportUnit) => {
  let title, width, length, height, weight, ldm, cbm;

  switch (transportUnit) {
    case 0:
      title = 'Truck standard';
      width = 2.48;
      length = 13.6;
      height = 2.7;
      weight = 26000;
      cbm = 68;
      ldm = 13.6;
      break;
    case 1:
      title = 'Truck mega';
      width = 2.48;
      length = 13.6;
      height = 2.9;
      weight = 26000;
      cbm = 68;
      ldm = 13.6;
      break;
    case 2:
      title = '20FT General';
      width = 2.35;
      length = 5.89;
      height = 2.36;
      weight = 26000;
      cbm = 33;
      ldm = 5.89;
      break;
    case 3:
      title = '20FT High Cube';
      width = 2.35;
      length = 5.89;
      height = 2.69;
      weight = 26000;
      cbm = 37;
      ldm = 5.89;
      break;
    case 4:
      title = '40FT General';
      width = 2.35;
      length = 12.05;
      height = 2.36;
      weight = 26000;
      cbm = 66;
      ldm = 12.05;
      break;
    case 5:
      title = '40FT High Cube';
      width = 2.35;
      length = 12.05;
      height = 2.69;
      weight = 26000;
      cbm = 76;
      ldm = 12.05;
      break;
  }

  return {
    title: title,
    width: width,
    length: length,
    height: height,
    weight: weight,
    cbm: cbm,
    ldm: ldm
  };
};

/**
 * Create three scene
 * @return {Promise<void>}
 */
export const createScene = async (transportUnit) => {
  const scene = new Scene();

  const switchUnit = switchTransportUnit(transportUnit);

  const loader = new OBJLoader();
  const textureLoader = new TextureLoader();

  const lightLeft = getSpotLight(1.5, 'rgb(255, 220, 180)');
  const lightRight = getSpotLight(1.6, 'rgb(255, 220, 180)');

  lightLeft.position.x = -40;
  lightLeft.position.y = 20;
  lightLeft.position.z = -20;

  lightRight.position.x = 50;
  lightRight.position.y = 14;
  lightRight.position.z = 16;

  scene.add(lightLeft);
  scene.add(lightRight);

  scene.background = new Color(0xa0a0a0);
  scene.fog = new Fog(0xa0a0a0, 10, 500);

  const dirLight = new DirectionalLight(0xffffff);
  dirLight.position.set(-0, 40, 50);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -25;
  dirLight.shadow.camera.left = -25;
  dirLight.shadow.camera.right = 25;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.mapSize.set(1024, 1024);
  scene.add(dirLight);

  const ground = new Mesh(
    new PlaneBufferGeometry(200, 200),
    new MeshPhongMaterial({
      color: 0x999999,
      depthWrite: false
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  const base = generateCollies(switchUnit.width, 1, switchUnit.length, 'base'); //base truck sizes
  base.position.x = 0;
  base.position.z = 0;
  base.position.y = 0;
  scene.add(base);

  return {
    scene,
    loader,
    textureLoader
  };
};
