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

import { Column, Row } from 'carbon-components-react';

export const Resume = ({ loadingState, totalCollies, totalWeight, transportUnit }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <h2 className="info-section__heading">Summary</h2>
        </Row>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <h3 className="info-section__heading">Cargo details</h3>
        </Row>
      </div>
      {loadingState.rows &&
        loadingState.rows[0] &&
        loadingState.rows[0].width &&
        loadingState.rows.map((item, idx) => (
          <>
            <Row>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>Collies number</h4>
                  {loadingState.rows[idx].number}
                </div>
              </Column>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>Width</h4>
                  {loadingState.rows[idx].width}
                  (CM)
                </div>
              </Column>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>Length</h4>
                  {loadingState.rows[idx].length}
                  (CM)
                </div>
              </Column>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>Height</h4>
                  {loadingState.rows[idx].height}
                  (CM)
                </div>
              </Column>
            </Row>
            <Row>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>Weight</h4>
                  {loadingState.rows[idx].weight}
                  (KG)
                </div>
              </Column>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>{loadingState.rows[idx].weightType ? 'Each collies' : 'Total weight'}</h4>
                </div>
              </Column>
              <Column sm={12} md={3} lg={3}>
                <div style={{ marginBottom: '2rem' }}>
                  <h4>{loadingState.rows[idx].stackable ? 'Stackable' : 'Not stackable'}</h4>
                </div>
              </Column>
            </Row>
          </>
        ))}
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <h3 className="info-section__heading">Totals</h3>
        </Row>
        <Row>
          <Column>
            <h4>Total collies</h4>
            {totalCollies}
          </Column>
          <Column>
            <h4>Total weight</h4>
            {totalWeight}
            KG
          </Column>
        </Row>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <h3 className="info-section__heading">Transport unit</h3>
        </Row>
      </div>
      {transportUnit === 0
        ? 'Truck standard'
        : transportUnit === 1
        ? 'Truck mega'
        : transportUnit === 2
        ? '20FT General'
        : transportUnit === 3
        ? '20FT High Cube'
        : transportUnit === 4
        ? '40FT General'
        : '40FT High Cube'}
    </div>
  );
};
