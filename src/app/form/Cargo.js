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
          <h3 className="info-section__heading">Dettagli del carico</h3>
        </Row>
      </div>
      {loadingState.rows.map((item, idx) => (
        <>
          <Row>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  id="number"
                  type="text"
                  name="number"
                  placeholder="Numero di colli"
                  required
                  value={loadingState.rows[idx].number}
                  invalidText="Obbligatorio"
                  onChange={handleChange(idx)}
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  id="width"
                  type="text"
                  name="width"
                  placeholder="Larghezza (CM)"
                  required
                  value={loadingState.rows[idx].width}
                  invalidText="Obbligatorio"
                  onChange={handleChange(idx)}
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  type="text"
                  name="length"
                  id="length"
                  placeholder="Lunghezza (CM)"
                  required
                  value={loadingState.rows[idx].length}
                  invalidText="Obbligatorio"
                  onChange={handleChange(idx)}
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <TextInput
                  type="text"
                  name="height"
                  id="height"
                  placeholder="Altezza (CM)"
                  required
                  value={loadingState.rows[idx].height}
                  invalidText="Obbligatorio"
                  onChange={handleChange(idx)}
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
                  placeholder="Peso (KG)"
                  required
                  value={loadingState.rows[idx].weight}
                  invalidText="Obbligatorio"
                  onChange={handleChange(idx)}
                />
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <FormLabel>
                  <Tooltip triggerText="">
                    Seleziona se il peso è per singolo collo o totale della riga
                  </Tooltip>
                  <FormGroup legendText="Peso totale/per collo">
                    <RadioButtonGroup
                      onChange={handleChange(idx, 'weightType')}
                      name={'weightType-' + idx}
                      defaultSelected={loadingState.rows[idx].weightType}>
                      <RadioButton value={0} id={'radio-weight1' + idx} labelText="Per collo" />
                      <RadioButton value={1} labelText="Totale" id={'radio-weight2' + idx} />
                    </RadioButtonGroup>
                  </FormGroup>
                </FormLabel>
              </div>
            </Column>
            <Column sm={12} md={3} lg={3}>
              <div style={{ marginBottom: '2rem' }}>
                <FormLabel>
                  <Tooltip triggerText="">Seleziona se la tua merce è sovrapponibile</Tooltip>
                  <FormGroup legendText="Merce sovrapponibile?">
                    <RadioButtonGroup
                      onChange={handleChange(idx, 'stackable')}
                      name={'stackable-' + idx}
                      defaultSelected={loadingState.rows[idx].stackable}>
                      <RadioButton value={1} id={'radio-stack1' + idx} labelText="Si" />
                      <RadioButton value={0} labelText="No" id={'radio-stack2' + idx} />
                    </RadioButtonGroup>
                  </FormGroup>
                </FormLabel>
              </div>
            </Column>
          </Row>
        </>
      ))}
      <Row>
        <Column>
          <AwesomeButton size="large" type="secondary" onPress={handleAddRow}>
            Aggiungi una riga
          </AwesomeButton>
        </Column>
      </Row>
    </Fragment>
  );
};
