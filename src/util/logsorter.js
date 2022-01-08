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

export const sorter = (arr, key) => {
  arr.sort((a, b) => (parseInt(a[key]) < parseInt(b[key]) ? 1 : -1));
};

export const generateRealArray = async (arr) => {
  let realArr = [];
  let count = 0;
  arr.map((item) => {
    if (item.stackable === 1) {
      const arr = new Array(parseInt(item.number));
      for (let j = 0; j < parseInt(item.number); j++) {
        arr[j] = Object.assign({}, item);
        count++;
      }
      realArr = [...realArr, ...arr];
    }
  });
  return realArr;
};

export const isStackable = (is_stackable, height) => {
  return is_stackable === 1 && height < 230;
};
