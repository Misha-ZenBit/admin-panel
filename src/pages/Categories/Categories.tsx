import { Checkbox, Divider, Button, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { ChangeEvent, useState } from 'react';
import { CheckBoxContainer, CheckBoxes, Page } from './styles';

const CheckboxGroup = Checkbox.Group;

const Categories: React.FC = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [curentValue, setCurentValue] = useState('');
  const [plainOptions, setPlainOptions] = useState([
    'Example Title 1',
    'Example Title 2',
    'Example Title 3',
    'Example Title 4',
    'Example Title 5',
    'Example Title 6',
    'Example Title 7',
    'Example Title 8',
    'Example Title 9',
    'Example Title 10',
    'Example Title 11',
    'Example Title 12',
    'Example Title 13',
  ]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCurentValue(e.currentTarget.value);
  };

  const onAddCategory = () => {
    if (curentValue) {
      plainOptions.push(curentValue);
      setCurentValue('');
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: '40%' }}>Categories Page</h1>
      <Page>
        <Input
          type="text"
          onChange={onCategory}
          value={curentValue}
          placeholder={' New category'}
        />
        <Button
          onClick={onAddCategory}
          type="primary"
          style={{ marginLeft: 20 }}
        >
          Add
        </Button>
        <Button type="primary" style={{ marginLeft: 10 }}>
          Delete
        </Button>
      </Page>
      <CheckBoxContainer>
        <CheckBoxes options={plainOptions} onChange={onChange} />
      </CheckBoxContainer>
    </>
  );
};

export default Categories;
