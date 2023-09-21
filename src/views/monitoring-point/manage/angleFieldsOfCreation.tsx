import { Form, InputNumber } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';
import { FormInputItem } from '../../../components/formInputItem';
import { MonitoringPointTypeValue } from '../types';
import { useLocaleContext } from '../../../localeProvider';
import { getDisplayName } from '../../../utils/format';

export const AngleFieldsOfCreation = ({
  type,
  name,
  restFields
}: {
  type?: number;
  name: number;
  restFields: {
    fieldKey?: number | undefined;
  };
}) => {
  const { language } = useLocaleContext();
  return (
    <Form.Item
      required
      label={getDisplayName({
        name: intl.get('TOWER_INSTALL_ANGLE'),
        suffix: '°',
        lang: language
      })}
      style={{ marginBottom: 0 }}
    >
      <FormInputItem
        {...restFields}
        name={[name, 'attributes', 'tower_install_angle']}
        requiredMessage={intl.get('PLEASE_ENTER_SOMETHING', {
          something: intl.get('TOWER_INSTALL_ANGLE')
        })}
        numericRule={{
          message: intl.get('VALIDATOR_NUMBER_RANGE', {
            name: intl.get('TOWER_INSTALL_ANGLE'),
            min: -180,
            max: 180
          }),
          min: -180,
          max: 180
        }}
        style={{ display: 'inline-block', width: 200, marginRight: 20 }}
        numericChildren={
          <InputNumber
            placeholder={intl.get('PLEASE_ENTER_SOMETHING', {
              something: intl.get('TOWER_INSTALL_ANGLE')
            })}
            style={{ width: '100%' }}
            controls={false}
          />
        }
      />
      {type === MonitoringPointTypeValue.TOWER_INCLINATION && (
        <FormInputItem
          {...restFields}
          required
          name={[name, 'attributes', 'tower_install_height']}
          label={getDisplayName({
            name: intl.get('TOWER_INSTALL_HEIGHT'),
            suffix: 'm',
            lang: language
          })}
          numericRule={{
            others: [
              {
                validator(_, value) {
                  if (value > 0) {
                    return Promise.resolve();
                  } else if (value == null) {
                    return Promise.reject(
                      new Error(
                        intl.get('PLEASE_ENTER_SOMETHING', {
                          something: intl.get('TOWER_INSTALL_HEIGHT')
                        })
                      )
                    );
                  } else {
                    return Promise.reject(
                      new Error(
                        intl.get('VALIDATOR_NUMBER_MORE', {
                          name: intl.get('TOWER_INSTALL_HEIGHT'),
                          min: 0
                        })
                      )
                    );
                  }
                }
              }
            ]
          }}
          style={{ display: 'inline-block', width: 200 }}
          numericChildren={
            <InputNumber
              placeholder={intl.get('PLEASE_ENTER_SOMETHING', {
                something: intl.get('TOWER_INSTALL_HEIGHT')
              })}
              style={{ width: '100%' }}
              controls={false}
            />
          }
        />
      )}
      {type === MonitoringPointTypeValue.TOWER_BASE_SETTLEMENT && (
        <FormInputItem
          {...restFields}
          required
          name={[name, 'attributes', 'tower_base_radius']}
          label={getDisplayName({
            name: intl.get('TOWER_BASE_RADIUS'),
            suffix: 'm',
            lang: language
          })}
          numericRule={{
            others: [
              {
                validator(_, value) {
                  if (value > 0) {
                    return Promise.resolve();
                  } else if (value == null) {
                    return Promise.reject(
                      new Error(
                        intl.get('PLEASE_ENTER_SOMETHING', {
                          something: intl.get('TOWER_BASE_RADIUS')
                        })
                      )
                    );
                  } else {
                    return Promise.reject(
                      new Error(
                        intl.get('VALIDATOR_NUMBER_MORE', {
                          name: intl.get('TOWER_BASE_RADIUS'),
                          min: 0
                        })
                      )
                    );
                  }
                }
              }
            ]
          }}
          style={{ display: 'inline-block', width: 200 }}
          numericChildren={
            <InputNumber
              placeholder={intl.get('PLEASE_ENTER_SOMETHING', {
                something: intl.get('TOWER_BASE_RADIUS')
              })}
              style={{ width: '100%' }}
              controls={false}
            />
          }
        />
      )}
    </Form.Item>
  );
};
