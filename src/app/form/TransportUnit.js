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

import { Column, Row, Select } from 'carbon-components-react';

export const TransportUnit = ({ transportUnit, setTransportUnit }) => {
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <h3 className="info-section__heading">Transport unit</h3>
        </Row>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <Column>
            <Select
              defaultValue={transportUnit}
              onChange={(e) => setTransportUnit(e.target.value)}
              id="transportUnit">
              <option selected={transportUnit === 0} value={0}>
                Truck standard
              </option>
              <option selected={transportUnit === 1} value={0}>
                Truck mega
              </option>
              <option selected={transportUnit === 2} value={0}>
                20FT General
              </option>
              <option selected={transportUnit === 3} value={0}>
                20FT High Cube
              </option>
              <option selected={transportUnit === 4} value={0}>
                40FT General
              </option>
              <option selected={transportUnit === 4} value={0}>
                40FT High Cube
              </option>
            </Select>
          </Column>
        </Row>
      </div>
    </>
  );
};
