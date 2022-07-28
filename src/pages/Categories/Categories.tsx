import { Checkbox, Button, Input, CheckboxOptionType } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, {
  ChangeEvent,
  Key,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { CheckBoxContainer, CheckBoxes, Page } from './styles';
import { collection, getDocs } from 'firebase/firestore';
import { db, categoriesRef } from '../../Firebase';

const CheckboxGroup = Checkbox.Group;

const Categories: React.FC = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [curentValue, setCurentValue] = useState('');
  const [categoriesId, setCategoriesId] = useState<any>([]);
  const [categoriesObj, setCategoriesObj] = useState<any>([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log('checked List', checkedList);
  }, [checkedList]);

  const getCategories = () => {
    getDocs(categoriesRef).then((resposne) => {
      const categories = resposne.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));

      setCategoriesObj(categories.map((e) => e.data.name));
      setCategoriesId(categories.map((e): string => e.id));
    });
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onAddCategory = () => {
    if (!curentValue) {
      return;
    }

    categoriesObj.push(curentValue);
    if (curentValue) {
      setCurentValue('');
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: '40%' }}>Categories Page</h1>
      <Page>
        <Input
          type="text"
          onChange={(e) => setCurentValue(e.currentTarget.value)}
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
        <CheckBoxes
          key={categoriesId}
          options={categoriesObj}
          onChange={onChange}
        />
      </CheckBoxContainer>
    </>
  );
};

export default Categories;
