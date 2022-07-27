import { Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { ChangeEvent, useState } from 'react';
import { CheckBoxContainer, CheckBoxes, Page } from './styles';

const CheckboxGroup = Checkbox.Group;

// let plainOptions = [
//   'Example Title 1',
//   'Example Title 2',
//   'Example Title 3',
//   'Example Title 4',
//   'Example Title 5',
//   'Example Title 6',
//   'Example Title 7',
//   'Example Title 8',
//   'Example Title 9',
//   'Example Title 10',
//   'Example Title 11',
//   'Example Title 12',
//   'Example Title 13',
// ];
const defaultCheckedList = [''];

const Categories: React.FC = () => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
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
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
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
      <Page>
        <h1 style={{ marginLeft: 40 }}>Categories Page</h1>
        <input
          type="text"
          onChange={onCategory}
          value={curentValue}
          placeholder={'Type new category'}
        />
        <button
          onClick={onAddCategory}
          type="submit"
          style={{ marginLeft: 20 }}
        >
          Add
        </button>
        <button style={{ marginLeft: 10 }}>Delete</button>
        <CheckBoxContainer>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Divider />
          <CheckBoxes
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </CheckBoxContainer>
      </Page>
    </>
  );
};

export default Categories;
