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
