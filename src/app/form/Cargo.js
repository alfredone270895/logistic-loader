import { Fragment } from 'react';
import {
  Column,
  FormGroup,
  FormLabel,
  RadioButton,
  RadioButtonGroup,
  Row,
  TextInput,
  Tooltip
} from 'carbon-components-react';
import { AwesomeButton } from 'react-awesome-button';

export const Cargo = ({ loadingState, handleAddRow, handleChange }) => {
  return (
    <Fragment>
      <div style={{ marginBottom: '2rem' }}>
        <Row>
          <h3 className="info-section__heading">Cargo details</h3>
        </Row>
      </div>
      {loadingState.rows.map((item, idx) => (
        <div key={`item-${idx}`}>
          <Row>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  id="number"
                  type="text"
                  name="number"
                  placeholder="Collies number"
                  required
                  value={loadingState.rows[idx].number}
                  invalidText="Required"
                  onChange={handleChange(idx)}
                  labelText="Collies number"
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  id="width"
                  type="text"
                  name="width"
                  placeholder="Width (CM)"
                  required
                  value={loadingState.rows[idx].width}
                  invalidText="Required"
                  onChange={handleChange(idx)}
                  labelText="Width (CM)"
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  type="text"
                  name="length"
                  id="length"
                  placeholder="Length (CM)"
                  required
                  value={loadingState.rows[idx].length}
                  invalidText="Required"
                  onChange={handleChange(idx)}
                  labelText="Length (CM)"
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  type="text"
                  name="height"
                  id="height"
                  placeholder="Height (CM)"
                  required
                  value={loadingState.rows[idx].height}
                  invalidText="Required"
                  onChange={handleChange(idx)}
                  labelText="Height (CM)"
                />
              </div>
            </Column>
          </Row>
          <Row>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  type="text"
                  name="weight"
                  id="weight"
                  placeholder="Weight (KG)"
                  required
                  value={loadingState.rows[idx].weight}
                  invalidText="Obbligatorio"
                  onChange={handleChange(idx)}
                  labelText="Weight (KG)"
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <FormLabel>
                  <Tooltip triggerText="">Select if weight is total or for each collies</Tooltip>
                  <FormGroup legendText="Weight total/Each collies">
                    <RadioButtonGroup
                      onChange={handleChange(idx, 'weightType')}
                      name={'weightType-' + idx}
                      defaultSelected={loadingState.rows[idx].weightType}>
                      <RadioButton value={0} id={'radio-weight1' + idx} labelText="Each collies" />
                      <RadioButton value={1} labelText="Total" id={'radio-weight2' + idx} />
                    </RadioButtonGroup>
                  </FormGroup>
                </FormLabel>
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <FormLabel>
                  <Tooltip triggerText="">Select if goods is/are stackable</Tooltip>
                  <FormGroup legendText="Is stackable?">
                    <RadioButtonGroup
                      onChange={handleChange(idx, 'stackable')}
                      name={'stackable-' + idx}
                      defaultSelected={loadingState.rows[idx].stackable}>
                      <RadioButton value={1} id={'radio-stack1' + idx} labelText="Yes" />
                      <RadioButton value={0} labelText="No" id={'radio-stack2' + idx} />
                    </RadioButtonGroup>
                  </FormGroup>
                </FormLabel>
              </div>
            </Column>
          </Row>
        </div>
      ))}
      <Row>
        <Column>
          <AwesomeButton size="large" type="secondary" onPress={handleAddRow}>
            Add a row
          </AwesomeButton>
        </Column>
      </Row>
    </Fragment>
  );
};
