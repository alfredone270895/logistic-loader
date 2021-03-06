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

import { Button, Column, Form, Grid, Row } from 'carbon-components-react';
import { AwesomeButton } from 'react-awesome-button';
import { useState } from 'react';
import standard from '../loadingExamples/standard.json';
import { Cargo } from '../app/form/Cargo';
import { TransportUnit } from '../app/form/TransportUnit';
import { Resume } from '../app/form/Resume';
import { useLoaderState } from '../logloader';
import Content from 'carbon-components-react/lib/components/UIShell/Content';

export const AppContent = () => {
  const [totalCollies, setTotalCollies] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [transportUnit, setTransportUnit] = useState(0);
  const [formState, setFormState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadingState, setLoadingState] = useState({
    rows: standard
  });
  const { runLoader } = useLoaderState(loadingState, setLoading, setLoaded, transportUnit);

  /**
   * aggiungo una riga al carico
   */
  const handleAddRow = () => {
    const item = {
      number: '',
      width: '',
      length: '',
      height: '',
      stackable: 1,
      weightType: 0
    };
    setLoadingState({
      rows: [...loadingState.rows, item]
    });
  };

  /**
   * rimuovo una riga del carico
   * @param idx
   * @return {function(): void}
   */
  // eslint-disable-next-line no-unused-vars
  const handleRemoveSpecificRow = (idx) => () => {
    const rows = [...loadingState.rows];
    rows.splice(idx, 1);
    setLoadingState({ rows });
  };

  /**
   * cambio le dimensioni della riga del carico
   * @param idx
   * @return {function(*, *=, *): void}
   */
  const handleChange = (idx) => (e, val) => {
    let name, value;
    if (e.target && !val) {
      name = e.target.name;
      value = e.target.value;
    } else {
      const explodeVal = val.split('-');
      value = e;
      name = explodeVal[0];
    }
    const rows = [...loadingState.rows];
    rows[idx][name] = value;
    setLoadingState({
      rows
    });
    let tWeight = 0;
    let tCollies = 0;
    rows.forEach((box) => {
      tCollies += parseInt(box.number);
      if (box.weightType === 1) {
        tWeight += parseInt(box.weight);
      } else {
        tWeight += parseInt(box.weight) * box.number;
      }
    });
    setTotalCollies(tCollies);
    setTotalWeight(tWeight);
  };

  const formProps = {
    onSubmit: (e) => {
      e.preventDefault();
    }
  };

  return (
    <Content id="main-content">
      <section>
        <Grid>
          {!loading && !loaded && (
            <Form {...formProps}>
              {formState === 0 && (
                <Cargo
                  handleAddRow={handleAddRow}
                  loadingState={loadingState}
                  handleChange={handleChange}
                />
              )}
              {formState === 1 && (
                <TransportUnit transportUnit={transportUnit} setTransportUnit={setTransportUnit} />
              )}

              {formState === 2 && (
                <Resume
                  loadingState={loadingState}
                  totalCollies={totalCollies}
                  totalWeight={totalWeight}
                  transportUnit={transportUnit}
                />
              )}
              <Row>
                <Column>
                  {formState < 2 ? (
                    <AwesomeButton
                      onPress={() => setFormState(formState + 1)}
                      size="large"
                      type="submit"
                      style={{ float: 'right' }}>
                      Next
                    </AwesomeButton>
                  ) : (
                    <AwesomeButton
                      size="large"
                      type="primary"
                      onPress={() => {
                        runLoader();
                        window.scrollTo(0, 0);
                      }}
                      style={{ float: 'right' }}>
                      Start loading
                    </AwesomeButton>
                  )}
                  {formState > 0 && (
                    <AwesomeButton
                      size="large"
                      type="submit"
                      onPress={() => setFormState(formState - 1)}
                      style={{ float: 'right' }}>
                      Indietro
                    </AwesomeButton>
                  )}
                </Column>
              </Row>
            </Form>
          )}
          {loaded && (
            <Row>
              <Column sm={12} md={12} lg={12}>
                <Resume
                  loadingState={loadingState}
                  totalCollies={totalCollies}
                  totalWeight={totalWeight}
                  transportUnit={transportUnit}
                />
                <Row>
                  <Column>
                    <AwesomeButton
                      size="large"
                      type="submit"
                      onPress={() => {
                        setLoaded(false);
                        const documents = document.getElementById('loadergl');
                        documents.removeChild(window.threeElement);
                        document.body.removeChild(window.labelRendererElement);
                        setFormState(formState - 1);
                      }}
                      style={{ float: 'right' }}>
                      Indietro
                    </AwesomeButton>
                  </Column>
                </Row>
              </Column>
            </Row>
          )}
        </Grid>
      </section>
    </Content>
  );
};
