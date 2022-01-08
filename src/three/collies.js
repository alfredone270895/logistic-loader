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
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  TextureLoader
} from 'three';
import { getRandomColor } from '../three/color';

/**
 * Generate collies
 * @param w
 * @param h
 * @param d
 * @param type
 * @param index
 * @return {Mesh}
 */
export function generateCollies(w, h, d, type, index = null) {
  let parameters = {};
  let textureLoader = new TextureLoader();
  let geometry = new BoxGeometry(w, h, d);
  let text;
  let colortmp;
  switch (type) {
    case '0':
      text = `Box ${index}. Width ${w}m, Length ${d}m, Height ${h}m`;
      colortmp = textureLoader.load('assets/textures/t01.jpg');
      break;
    case '1':
      text = `Box ${index}. Width ${w}m, Length ${d}m, Height ${h}m`;
      colortmp = textureLoader.load('assets/textures/t02.jpg');
      break;
    case 'base':
      text = 'Base. Width 248cm, Length 1360cm, Height 270cm';
      colortmp = textureLoader.load('assets/textures/metal.jpg');
      break;
    default:
      text = `Box ${index}. Width ${w}m, Length ${d}m, Height ${h}m`;
      colortmp = textureLoader.load('assets/textures/t01.jpg');
      parameters.color = getRandomColor();
      break;
  }

  colortmp.wrapS = RepeatWrapping;
  colortmp.wrapT = RepeatWrapping;
  colortmp.repeat.set(6, 5);

  parameters.map = colortmp;

  const material = new MeshStandardMaterial(parameters);

  const mesh = new Mesh(geometry, material);

  mesh.name = text;

  const wireframeMaterial = new MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    linewidth: 4
  });
  const wireframe = new Mesh(geometry, wireframeMaterial);

  mesh.add(wireframe);

  return mesh;
}
